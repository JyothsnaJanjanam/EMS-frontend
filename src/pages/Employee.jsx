import React from 'react'
import Navbar from '../components/dashboard/Navbar'
import Sidebar from '../components/EmployeeDashboard/Sidebar'
import '../CSS/Admin.css'
import { useAuth } from '../context/UserContext'
import { Outlet } from 'react-router-dom'

const Employee = () => {
  const {user} = useAuth()
  return (
    <div className='container'>
      <Sidebar />
      <div className='admin-navbar'>
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default Employee