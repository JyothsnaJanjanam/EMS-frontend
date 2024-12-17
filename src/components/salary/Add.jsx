import React, { useEffect, useState } from 'react'
import '../../CSS/AddSalary.css'
import { fetchDepartments, getEmployees } from '../../utils/EmployeeHelper'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const Add = () => {
  
  const [salary, setSalary] = useState({
    employeeId: null,
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    payDate: null
  })
  const [employees, setEmployees] = useState([])
  const [departments, setDepartments] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
      const getDepartments = async () => {
        const departments = await fetchDepartments()
        setDepartments(departments)
      }
      getDepartments();
    }, [])

    const handleDepartment = async (e) => {
      const emps = await getEmployees(e.target.value)
      setEmployees(emps)
    }

  const handleChange = (e) => {
    const {name, value} = e.target
    setSalary((prevData) => ({...prevData, [name]: value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`https://ems-backend-one.vercel.app/api/salary/add`, salary, {
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
    <>{departments ? ( 
      <div className='add-sal-container'>
        <h2 className='add-sal-head'>Add Salary</h2>
        <form onSubmit={handleSubmit} className='sal-form-cont'>
          <div className='sal-fields'>

            {/* { Department } */}
            <div className='sal-field-cont'>
              <label className='sal-field-label'>Department</label>
              <select name="department" className='sal-field-inp' onChange={handleDepartment} required>
                <option value=''>Select Department</option>
                {departments.map((dep) => (
                  <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                ))}
              </select>
            </div>

            {/* { Employee } */}
            <div className='sal-field-cont'>
              <label className='sal-field-label'>Employee</label>
              <select name="employeeId" className='sal-field-inp' onChange={handleChange} required>
                <option value=''>Select Employee</option>
                {employees.map((emp) => (
                  <option key={emp._id} value={emp._id}>{emp.employeeId}</option>
                ))}
              </select>
            </div>

            {/* { Basic Salary } */}
            <div className='sal-field-cont'>
              <label className='sal-field-label'>Basic Salary</label>
              <input type="number" name='basicSalary' placeholder='Basic Salary' onChange={handleChange} className='sal-field-inp' required />
            </div>

            {/* { Allowances } */}
            <div className='sal-field-cont'>
              <label className='sal-field-label'>Allowances</label>
              <input type="number" name='allowances' placeholder='Salary' className='sal-field-inp' onChange={handleChange} required />
            </div>

            {/* { Deductions } */}
            <div className='sal-field-cont'>
              <label className='sal-field-label'>Deductions</label>
              <input type="number" name='deductions' placeholder='Deductions' className='sal-field-inp' onChange={handleChange} required />
            </div>

            {/* { Pay Date } */}
            <div className='sal-field-cont'>
              <label className='sal-field-label'>Pay Date</label>
              <input type="date" name='payDate' placeholder='Pay Date' className='sal-field-inp' onChange={handleChange} required />
            </div>

          </div>

          <button type='submit' className='submit-butt but'>Add Salary</button>
        </form>
      </div>
    ) : <div>Loading....</div> } </>
  )
}

export default Add