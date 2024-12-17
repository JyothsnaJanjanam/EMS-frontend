import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaTachometerAlt, FaUsers, FaBuilding, FaCalendarAlt, FaMoneyBillWave, FaCogs } from 'react-icons/fa'
import '../../CSS/AdminSidebar.css'

const AdminSidebar = () => {
  return (
    <div className='admin-container'>
      <div className='sidebar-container-head'>
        <h3>Employee Ms</h3>
      </div>
      <NavLink to={'/admin'} className={({isActive}) => `${isActive ? 'selected-link' : ' '} sidebar-link`}
       end>
        <FaTachometerAlt className='sidebar-icon'/>
        <span>Dashboard</span>
      </NavLink>
    
      <NavLink to={'/admin/employees'} className={({isActive}) => `${isActive ? 'selected-link' : ' '} sidebar-link`}>
        <FaUsers className='sidebar-icon' />
        <span>Employee</span>
      </NavLink>
      <NavLink to={'/admin/departments'} className={({isActive}) => `${isActive ? 'selected-link' : ' '} sidebar-link`}>
        <FaBuilding className='sidebar-icon'/>
        <span>Departments</span>
      </NavLink>
      <NavLink to={'/admin/leaves'} className={({isActive}) => `${isActive ? 'selected-link' : ' '} sidebar-link`}>
        <FaCalendarAlt className='sidebar-icon'/>
        <span>Leaves</span>
      </NavLink>
      <NavLink to={'/admin/salary/add'} className={({isActive}) => `${isActive ? 'selected-link' : ' '} sidebar-link`}>
        <FaMoneyBillWave className='sidebar-icon'/>
        <span>Salary</span>
      </NavLink>
      <NavLink to={'/admin/settings'} className='sidebar-link'>
        <FaCogs className='sidebar-icon'/>
        <span>Settings</span>
      </NavLink>
    </div>
  )
}

// TODO: settings icon
export default AdminSidebar