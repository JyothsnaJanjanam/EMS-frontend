import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../../CSS/LeaveDetail.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const LeaveDetail = () => {

  const {id} = useParams()
  const [leave, setLeave] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(`https://ems-backend-fawn.vercel.app/api/leave/details/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth-token')}`
          }
        })
        if(response.data.success) {
          setLeave(response.data.leave)
        }
      } catch (error) {
        if(error.response && !error.response.data.success) {
          alert(error.response.data.message)
        }
      }
    }
    fetchLeave();
  }, [])

  const changeStatus = async (id, status) => {
    try {
      const response = await axios.put(`https://ems-backend-fawn.vercel.app/api/leave/${id}`, {status}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`
        }
      })
      if(response.data.success) {
        navigate('/admin/leaves')
      }
    } catch (error) {
      if(error.response && !error.response.data.success) {
        alert(error.response.data.message)
      }
    }
  } 

  return (
    <>{leave ? (
      <div className='view-detail-display'>
        <h2 className='view-detail-head'>Leave Details</h2>
        <div className='view-detail-cont'>
          <div>
            <img src={`https://ems-backend-fawn.vercel.app/${leave.employeeId.userId.profileImage}`} className='view-detail-img' />
          </div>
          <div>

            <div className='vd-field'>
              <p className='vd-field-head'>Name: </p>
              <p className='vd-field-details'>{leave.employeeId.userId.name}</p>
            </div>

            <div className='vd-field'>
              <p className='vd-field-head'>Employee ID: </p>
              <p className='vd-field-details'>{leave.employeeId.employeeId}</p>
            </div>

            <div className='vd-field'>
              <p className='vd-field-head'>Leave Type: </p>
              <p className='vd-field-details'>{leave.leaveType}</p>
            </div>

            <div className='vd-field'>
              <p className='vd-field-head'>Reason: </p>
              <p className='vd-field-details'>{leave.reason}</p>
            </div>
            
            <div className='vd-field'>
              <p className='vd-field-head'>Department: </p>
              <p className='vd-field-details'>{leave.employeeId.department.dep_name}</p>
            </div>

            <div className='vd-field'>
              <p className='vd-field-head'>Start Date: </p>
              <p className='vd-field-details'>{new Date(leave.startDate).toLocaleDateString()}</p>
            </div>

            <div className='vd-field'>
              <p className='vd-field-head'>End Date: </p>
              <p className='vd-field-details'>{new Date(leave.endDate).toLocaleDateString()}</p>
            </div>
            
            <div className='vd-field'>
              <p className='vd-field-head'>
                {leave.status === 'Pending' ? 'Action:' : 'Status:'}
              </p>
              {leave.status === 'Pending' 
                ? ( 
                    <div className='action'>
                      <button className='green-but' onClick={() => changeStatus(leave._id, 'Approved')}>Approve</button>
                      <button className='red-but' onClick={() => changeStatus(leave._id, 'Rejected')}>Reject</button>
                    </div>
                  ) 
                : <p className='vd-field-details'>{leave.status}</p>
              }
            </div>
          </div>
        </div>
      </div>
    ) : <div>Loading...</div>}</>
  )
}

export default LeaveDetail