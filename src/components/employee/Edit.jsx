import React, { useEffect, useState } from 'react'
import '../../CSS/EditEmployee.css'
import { fetchDepartments } from '../../utils/EmployeeHelper'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const Edit = () => {

  const [employee, setEmployee] = useState({
    employeeId: '',
    dob: '',
    gender: '',
    maritalStatus: '',
    designation: '',
    department: '',
    salary: 0,
    role: '',
  })
  const [departments, setDepartments] = useState(null)
  const navigate = useNavigate()
  const {id} = useParams()

  useEffect(() => {
      const getDepartments = async () => {
        const departments = await fetchDepartments()
        setDepartments(departments)
      }
      getDepartments();
    }, [])

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`https://ems-backend-fawn.vercel.app/api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth-token')}`
          }
        })
        // console.log(response.data.employee.department.dep_name)
        if(response.data.success) {
          const employee = response.data.employee
          setEmployee((prev) => ({
            ...prev, 
            employeeId: employee.employeeId,
            dob: employee.dob.slice(0, 10),
            gender: employee.gender, 
            maritalStatus: employee.maritalStatus,
            department: employee.department.dep_name,
            designation: employee.designation,
            salary: employee.salary,
            role: employee.userId.role
          }))
        }
      } catch (error) {
        console.log(error.response)
        if(error.response && !error.response.data.success) {
          alert(error.response.data.message)
        }
      }
    }
    fetchEmployee();
  }, [])

  const handleChange = (e) => {
    const {name, value} = e.target
    setEmployee((prevData) => ({...prevData, [name]: value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.put(`https://ems-backend-fawn.vercel.app/api/employee/${id}`, employee, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
        }
      })
      if(response.data.success) {
        navigate('/admin/employees')
      }
    } catch (error) {
      if(error.response && !error.response.data.success) {
        alert(error.response.data.message)
      }
    }
  }

  return (
    <>{departments && employee ? ( 
      <div className='edit-emp-container'>
        <h2 className='edit-emp-head'>Edit Employee</h2>
        <form onSubmit={handleSubmit} className='edit-form-cont'>
          <div className='edit-fields'>

            {/* { Employee ID } */}
            <div className='edit-field-cont'>
              <label className='edit-field-label'>Employee ID</label>
              <input type="text" name='employeeId' value={employee.employeeId} placeholder='Employee ID' 
              onChange={handleChange} className='edit-field-inp' required />
            </div>

            {/* { DOB } */}
            <div className='edit-field-cont'>
              <label className='edit-field-label'>Date of Birth</label>
              <input type="date" name='dob' value={employee.dob} placeholder='DOB' className='edit-field-inp' 
              onChange={handleChange} required />
            </div>

            {/* { Gender } */}
            <div className='edit-field-cont'>
              <label className='edit-field-label opt'>Gender</label>
              <select name="gender" value={employee.gender} className='edit-field-inp' onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* { Marital Status } */}
            <div className='edit-field-cont'>
              <label className='edit-field-label'>Marital Status</label>
              <select name="maritalStatus" placeholder='Marital Status' className='edit-field-inp' value={employee.maritalStatus} onChange={handleChange} required >
                <option value="">Select status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
              </select>
            </div>

            {/* { Designation } */}
            <div className='edit-field-cont'>
              <label className='edit-field-label'>Designation</label>
              <input type="text" name='designation' placeholder='Designation' onChange={handleChange} className='edit-field-inp' value={employee.designation} required />
            </div>

            {/* { Department } */}
            <div className='edit-field-cont dep-cont'>
              <label className='edit-field-label'>Department</label>
              <select name="department" value={employee.department} className='edit-field-inp' onChange={handleChange} required>
                <option value=''>Select Department</option>
                {departments.map((dep) => (
                  <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                ))}
              </select>
            </div>

            {/* { Salary } */}
            <div className='edit-field-cont'>
              <label className='edit-field-label'>Salary</label>
              <input type="number" name='salary' placeholder='Salary' className='edit-field-inp' onChange={handleChange} value={employee.salary} required />
            </div>

            {/* { Role } */}
            <div className='edit-field-cont'>
              <label className='edit-field-label'>Role</label>
              <select name="role" value={employee.role} className='edit-field-inp' onChange={handleChange} required>
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
              </select>
            </div>

          </div>

          <button type='submit' className='submit-butt but'>Update Employee</button>
        </form>
      </div>
    ) : <div>Loading....</div> } </>
  )
}

export default Edit