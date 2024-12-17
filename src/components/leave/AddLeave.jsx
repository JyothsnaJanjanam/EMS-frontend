import React, { useState } from 'react'
import '../../CSS/AddLeave.css'
import { useAuth } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AddLeave = () => {

  const {user} = useAuth()
  const navigate = useNavigate()

  const [leave, setLeave] = useState({
    userId: user._id,
  })

  const handleChange = (e) => {
    const {name, value} = e.target
    setLeave((prevState) => ({...prevState, [name]: value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()    
    try {
      const response = await axios.post(`https://ems-backend-one.vercel.app/api/leave/add`, leave, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`
        }
      })
      // console.log(response.data)
      if(response.data.success) {
        navigate(`/employee-dashboard/leaves/${user._id}`)
      }
    } catch (error) {
      console.log(error.response.data)
      if(error.response && !error.response.data.success) {
        alert(error.response.data.message)
      }
    }
  }

  return (
    <div className='add-leave-container'>
        <h2 className='add-leave-head'>Request for Leave</h2>
        <form className='leave-form-cont' onSubmit={handleSubmit}>
          <div className='fields'>

            {/* { Leave Type } */}
            <div className='field-cont'>
              <label className='field-label'>Leave Type</label>
              <select name="leaveType" className='field-inp' onChange={handleChange} required>
                <option value=""></option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Annual Leave">Annual Leave</option>
              </select>
            </div>

            <div className='date-fields'>

              {/* { From Date } */}
              <div className='field-cont'>
                <label className='field-label'>From Date</label>
                <input type="date" name='startDate' className='field-inp' onChange={handleChange} required />
              </div>

              {/* { To Date } */}
              <div className='field-cont'>
                <label className='field-label'>To Date</label>
                <input type="date" name='endDate' className='field-inp' onChange={handleChange} required />
              </div>

            </div>

            {/* { Description } */}
            <div className='field-cont'>
              <label className='field-label'>Description</label>
              <textarea name='reason' placeholder='Reason'className='field-inp' onChange={handleChange} ></textarea>
            </div>
           
         </div>
          <button type='submit' className='submit-butt but'>Add Leave</button>
        </form>
      </div>
  )
}

export default AddLeave