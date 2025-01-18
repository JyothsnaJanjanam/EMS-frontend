import React, { useEffect, useState } from 'react'
import '../../CSS/AddEmployee.css'
import { fetchDepartments } from '../../utils/EmployeeHelper'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddEmployee = () => {

  const [departments, setDepartments] = useState([])
  const [formData, setFormData] = useState({})

  const navigate = useNavigate()

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments()
      setDepartments(departments)
    }
    getDepartments();
  }, [])

  const handleChange = (e) => {
    const {name, value, files} = e.target
    if(name === 'image') {
      setFormData((prevData) => ({...prevData, [name]: files[0]}))
    } else {
      setFormData((prevData) => ({...prevData, [name]: value}))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formDataObj = new FormData()
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key])
    })

    try {
      // console.log('fdo', formDataObj)
      console.log('FormData contents:');
    for (let pair of formDataObj.entries()) {
      console.log(pair[0] + ':', pair[1]);
    }
      const response = await axios.post('https://ems-backend-fawn.vercel.app/api/employee/add', formDataObj, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
        }
      })      
      console.log(response)
      if(response.data.success) {
        navigate('/admin/employees')
      }
    } catch (error) {
      console.log(error.response.data)
      if(error.response && !error.response.data.success) {
        alert(error.response.data.message)
      }
    }
  }

  return (
    <div className='add-emp-container'>
      <h2 className='add-emp-head'>Add New Employee</h2>
      <form onSubmit={handleSubmit} className='form-cont'>
        <div className='emp-fields'>

          {/* { Name } */}
          <div className='emp-field-cont'>
            <label className='emp-field-label'>Name</label>
            <input type="text" name='name' placeholder='Enter Name' className='emp-field-inp' onChange={handleChange} required />
          </div>

          {/* { Email } */}
          <div className='emp-field-cont'>
            <label className='emp-field-label'>Email</label>
            <input type="email" name='email' placeholder='Enter Email' className='emp-field-inp' onChange={handleChange} required />
          </div>

          {/* { Employee ID } */}
          <div className='emp-field-cont'>
            <label className='emp-field-label'>Employee ID</label>
            <input type="text" name='employeeId' placeholder='Employee ID' 
            onChange={handleChange} className='emp-field-inp' required />
          </div>

          {/* { DOB } */}
          <div className='emp-field-cont'>
            <label className='emp-field-label'>Date of Birth</label>
            <input type="date" name='dob' placeholder='DOB' className='emp-field-inp' 
            onChange={handleChange} required />
          </div>

          {/* { Gender } */}
          <div className='emp-field-cont'>
            <label className='emp-field-label opt'>Gender</label>
            <select name="gender" className='emp-field-inp' onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* { Marital Status } */}
          <div className='emp-field-cont'>
            <label className='emp-field-label'>Marital Status</label>
            <select name="maritalStatus" placeholder='Marital Status' className='emp-field-inp' onChange={handleChange} required>
              <option value="">Select status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>

          {/* { Designation } */}
          <div className='emp-field-cont'>
            <label className='emp-field-label'>Designation</label>
            <input type="text" name='designation' placeholder='Designation' 
            onChange={handleChange}className='emp-field-inp' required />
          </div>

          {/* { Department } */}
          <div className='emp-field-cont'>
            <label className='emp-field-label'>Department</label>
            <select name="department" className='emp-field-inp' onChange={handleChange} required>
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
              ))}
            </select>
          </div>

          {/* { Salary } */}
          <div className='emp-field-cont'>
            <label className='emp-field-label'>Salary</label>
            <input type="number" name='salary' placeholder='Salary' className='emp-field-inp' onChange={handleChange} required />
          </div>

          {/* { Password } */}
          <div className='emp-field-cont'>
            <label className='emp-field-label'>Password</label>
            <input type="password" name='password' placeholder='******' className='emp-field-inp' onChange={handleChange}required />
          </div>

          {/* { Role } */}
          <div className='emp-field-cont'>
            <label className='emp-field-label'>Role</label>
            <select name="role" className='emp-field-inp' onChange={handleChange} required>
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>

          {/* { Image Upload } */}
          <div className='emp-field-cont'>
            <label className='emp-field-label' >Upload Image</label>
            <input type="file" name='image' placeholder='Upload Image' className='emp-field-inp'onChange={handleChange} accept='image/*' />
          </div>

        </div>

        <button type='submit' className='submit-butt'>Add Employee</button>
      </form>
    </div>
  )
}

export default AddEmployee
