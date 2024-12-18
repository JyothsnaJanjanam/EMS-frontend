import React, { useEffect, useState } from 'react'
import '../../CSS/AdminSummary.css'
import SummaryCard from './SummaryCard'
import { FaBuilding, FaMoneyBillWave, FaUsers, FaFileAlt, FaCheckCircle, FaHourglassHalf, FaTimesCircle } from 'react-icons/fa'
import axios from 'axios'

const AdminSummary = () => {

  const [summary, setSummary] = useState(null)

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const summary = await axios.get('https://ems-backend-fawn.vercel.app/api/dashboard/summary', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
          }
        })
        // console.log(summary)
        setSummary(summary.data)
      } catch (error) {
        if(error.response) {
          alert(error.response.data.message)
        }
        console.log(error.message)
      }
    }
    fetchSummary()
  }, [])

  if(!summary) {
    return <div>Loading....</div>
  }

  return (
    <div className='sum-container'>
      <h3 className='sum-overview'>Dashboard Overview</h3>
      <div className='sum-overview-box'>
        <SummaryCard icon={<FaUsers />} text='Total Employees' number={summary.totalEmployees} color={'blue'} />
        <SummaryCard icon={<FaBuilding />} text='Total Departments' number={summary.totalDepartments} color={'rgb(218, 160, 14)'} />
        <SummaryCard icon={<FaMoneyBillWave />} text='Monthly Salary' number={summary.totalSalary} color={'rgb(216, 10, 10)'} />
      </div>

      <div className='sum-leave-container'>
        <h4 className='sum-leave-details'>Leave Details</h4>

        <div className='sum-leave-box'>
          <SummaryCard icon={<FaFileAlt />} text='Leave Applied' number={summary.leaveSummary.appliedFor} color={'blue'} />
          <SummaryCard icon={<FaCheckCircle />} text='Leave Approved' number={summary.leaveSummary.approved} color={'rgb(11, 130, 11)'} />
          <SummaryCard icon={<FaHourglassHalf />} text='Leave Pending' number={summary.leaveSummary.pending} color={'rgb(218, 160, 14)'} />
          <SummaryCard icon={<FaTimesCircle />} text='Leave Rejected' number={summary.leaveSummary.rejected} color={'rgb(201, 20, 20)'} />
        </div>
      </div>
    </div>
  )
}

export default AdminSummary