import React, { useState } from 'react'
import '../../CSS/AddDepartment.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AddDepartment = () => {

  const [department, setDepartment] = useState({
    dep_name: '',
    description: ''
  }) 
  const navigate = useNavigate()

  const handleChange = (e) => {
    const {name, value} = e.target;
    setDepartment({...department, [name] : value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://ems-backend-fawn.vercel.app/api/department/add', department, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
        }
      })
      if(response.data.success) {
        navigate('/admin/departments')
      }
    } catch (error) {
      console.log(error)
      if(error.response && !error.response.data.success) {
        alert(error.response.data.message)
      }
    }
  }

  return (
    <div className='add-dep-container'>
      <h2 className='add-head'>Add New Department</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label 
            htmlFor="dep_name" 
            className='add-name'
          >
            Department Name
          </label>
          <input
            name='dep_name' 
            type="text" 
            onChange={handleChange}
            placeholder='Enter Dep Name' 
            className='add-name-inp' 
            required />
        </div>

        <div className='add-desc-con'>
          <label 
            htmlFor="description" 
            className='add-desc'
          >
            Description
          </label>
          <textarea 
            name="description" 
            placeholder='Description' 
            onChange={handleChange}
            className='add-desc-inp' />
        </div>
        <button type='submit' className='add-butt'>Add Department</button>
      </form>
    </div>
  )
}

export default AddDepartment