import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/UserContext';
import '../../CSS/Settings.css'
import axios from 'axios';

const Settings = () => {

  const navigate = useNavigate();
  const {user} = useAuth()
  const [setting, setSetting] = useState({
    userId: user._id,
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setSetting({...setting, [name]: value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (setting.newPassword !== setting.confirmPassword) {
      setError('Password not matched')
    } else {
      try {
        const response = await axios.put('http://localhost:7001/api/setting/change-password', setting, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
          }
        })
        if (response.data.success) {
          if(user.role === 'admin') {
            navigate('/admin/employees')
          } else {
            navigate('/employee-dashboard');
          }
          setError('')
        }
      } catch(error) {
        if(error.response && !error.response.data.success) {
          setError(error.response.data.message)
        }
      }
    }
  }
  return (
    <div className="setting">
      <h2 className='setting-head'>Change Password</h2>
      <p>{error}</p>
      <form className="setting-container" onSubmit={handleSubmit}>
        {/* Department Name */}
        <div className="setting-field">
          <label>Old Password</label>        
          <input 
            name='oldPassword' 
            type="password" 
            placeholder='Change Password' 
            onChange={handleChange}
            required
            />
        </div>

        {/* New Password */}
        <div className="setting-field">
          <label>New Password</label>
          <input 
            name='newPassword' 
            type="password" 
            placeholder='New Password' 
            onChange={handleChange}
            required
            />
        </div>

        {/* Confirm Password */}
        <div className="setting-field">
          <label>Confirm Password</label>
          <input 
            name='confirmPassword' 
            type="password" 
            placeholder='Confirm Password' 
            onChange={handleChange}
            required
            />
        </div>

        {error && <p className='error-msg'>{error}</p>}

        <button type='submit' className='cp-button'>Change Password</button>
      </form>
    </div>
  )
}

export default Settings