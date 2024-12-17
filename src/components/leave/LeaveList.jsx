import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../../CSS/LeaveList.css'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../../context/UserContext'

const LeaveList = () => {
  const {user} = useAuth()
  const [leaves, setLeaves] = useState(null)
  let sno = 1
  const {id} = useParams()

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(`http://localhost:7001/api/leave/${id}/${user.role}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`
        }
      })
      // console.log('repsosne', response.data)
      if(response.data.success) {
        setLeaves(response.data.leaves)
      }
    } catch (error) {
      // console.log(error)
      if(error.response && !error.response.data.success) {
        alert(error.message)
      }
    }
  }
  
  useEffect(() => {
    fetchLeaves()
  }, [])

  if(!leaves) {
    return <div>Loading....</div>
  }

  return (
    <div className='leave-container'>
      <div>
        <h3 className='leave-head'>Manage Leaves</h3>
      </div>
      <div className='leave-details'>
        <input type="text" placeholder='Search By Dep Name' className='leave-input' />
        {user.role === 'employee' && 
          (
            <Link to={'/employee-dashboard/add-leave'} className='leave-link'>Add New Leave</Link>
          )}
      </div>

      <table className='table'>
        <thead className='table-head-row'>
          <tr>
            <th className='table-head'>SNO</th>
            <th className='table-head'>Leave Type</th>
            <th className='table-head'>From</th>
            <th className='table-head'>To</th>
            <th className='table-head'>Description</th>
            <th className='table-head'>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave._id} className='table-data-row'>
              <td className='table-data'>{sno++}</td>
              <td className='table-data'>{leave.leaveType}</td>
              <td className='table-data'>
                {new Date(leave.startDate).toLocaleDateString()}
              </td>
              <td className='table-data'>
                {new Date(leave.endDate).toLocaleDateString()}
              </td>
              <td className='table-data'>{leave.reason}</td>
              <td className='table-data'>{leave.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LeaveList