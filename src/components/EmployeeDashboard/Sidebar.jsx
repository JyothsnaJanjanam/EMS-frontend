import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaTachometerAlt, FaUsers, FaBuilding, FaCalendarAlt, FaMoneyBillWave, FaCogs } from 'react-icons/fa'
import '../../CSS/AdminSidebar.css'
import { useAuth } from '../../context/UserContext'

const Sidebar = () => {

  const {user} = useAuth()

  return (
    <div className='admin-container'>
      <div className='sidebar-container-head'>
        <h3>Employee Ms</h3>
      </div>
      <div>
        <NavLink to={'/employee-dashboard'} className={({isActive}) => `${isActive ? 'selected-link' : ' '} sidebar-link`}
        end>
          <FaTachometerAlt className='sidebar-icon'/>
          <span>Dashboard</span>
        </NavLink>
      
        <NavLink to={`/employee-dashboard/profile/${user._id}`} className={({isActive}) => `${isActive ? 'selected-link' : ' '} sidebar-link`}>
          <FaUsers className='sidebar-icon' />
          <span>My Profile</span>
        </NavLink>
        
        <NavLink to={`/employee-dashboard/leaves/${user._id}`} className={({isActive}) => `${isActive ? 'selected-link' : ' '} sidebar-link`}>
          <FaCalendarAlt className='sidebar-icon'/>
          <span>Leaves</span>
        </NavLink>

        <NavLink to={`/employee-dashboard/salary/${user._id}`} className={({isActive}) => `${isActive ? 'selected-link' : ' '} sidebar-link`}>
          <FaMoneyBillWave className='sidebar-icon'/>
          <span>Salary</span>
        </NavLink>

        <NavLink to={'/employee-dashboard/setting'} className={({isActive}) => `${isActive ? 'selected-link' : ' '} sidebar-link`}>
          <FaCogs className='sidebar-icon'/>
          <span>Change Password</span>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar