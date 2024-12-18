import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../CSS/Login.css'
import { useAuth } from '../context/UserContext'
import axios from 'axios'

const Login = () => {

  const [formData, setFormData] = useState({email: '', password: ''})
  const [error, setError] = useState(null)

  const {login} = useAuth()

  const navigate = useNavigate()

  const changeHandler = (e) => {
    e.preventDefault();
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://ems-backend-fawn.vercel.app/api/auth/login', formData)
      if(response.data.success) {
        login(response.data.user)
        localStorage.setItem('auth-token', response.data.token);
        if(response.data.user.role === 'admin') {
          navigate('/admin')
        } else {
          navigate('/employee-dashboard')
        }
      }
    } catch (error) {
      console.log(error)
      if(error.response && !error.response.data.success) {
        setError(error.response.data.message)
      } else {
        setError('Server Error')
      }
    }
  }

  return (
      <div className="login">
        <h1>Login</h1>

        <form className="login-container" onSubmit={changeHandler}>
          <div className="login-field">
            <label>Email</label>        
            <input 
              name='email' 
              value={formData.email}
              type="email" 
              placeholder='Email Address' 
              onChange={changeHandler}
              required
              />
          </div>
        
          <div className="login-field">
            <label>Password</label>
            <input 
              name='password' 
              value={formData.password}
              type="password" 
              placeholder='Password' 
              onChange={changeHandler}
              required
              />
          </div>

          {error && <p className='error-msg'>{error}</p>}

          {/* <p className='register-login-acc'>Create an account? 
            <span><Link to={'/register'} style={{textDecoration: 'none', color: 'blue'}}>Click Here</Link></span></p> */}
          
          <button type='submit' onClick={handleLogin}>Login</button>
        </form>
      </div>
  )
}

export default Login