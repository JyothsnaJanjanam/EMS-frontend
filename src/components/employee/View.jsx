import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../../CSS/EmployeeView.css'
import axios from 'axios'

const View = () => {

  const {id} = useParams()
  const [employee, setEmployee] = useState()

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`https://ems-backend-neon.vercel.app/api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth-token')}`
          }
        })
        if(response.data.success) {
          setEmployee(response.data.employee)
        }
      } catch (error) {
        if(error.response && !error.response.data.success) {
          alert(error.response.data.message)
        }
      }
    }
    fetchEmployee();
  }, [])

  return (
    <>{employee ? (
      <div className='view-display'>
        <h2 className='view-head'>Employee Details</h2>
        <div className='view-details'>
          <div>
            <img src={`https://ems-backend-neon.vercel.app/${employee.userId.profileImage}`} className='view-img' />
          </div>
          <div>

            <div className='field'>
              <p className='field-head'>Name: </p>
              <p className='field-details'>{employee.userId.name}</p>
            </div>

            <div className='field'>
              <p className='field-head'>Employee ID: </p>
              <p className='field-details'>{employee.employeeId}</p>
            </div>

            <div className='field'>
              <p className='field-head'>Date of Birth: </p>
              <p className='field-details'>{new Date(employee.dob).toLocaleDateString()}</p>
            </div>

            <div className='field'>
              <p className='field-head'>Gender: </p>
              <p className='field-details'>{employee.gender}</p>
            </div>

            <div className='field'>
              <p className='field-head'>Department: </p>
              <p className='field-details'>{employee.department.dep_name}</p>
            </div>

            <div className='field'>
              <p className='field-head'>Marital Status:</p>
              <p className='field-details'>{employee.maritalStatus}</p>
            </div>
          </div>
        </div>
      </div>
    ) : <div>Loading...</div>}</>
  )
}

export default View