import React from 'react'
import '../CSS/Admin.css'
import { useAuth } from '../context/UserContext'
import AdminSidebar from '../components/dashboard/AdminSidebar';
import Navbar from '../components/dashboard/Navbar';
import { Outlet } from 'react-router-dom';

const Admin = () => {
  const {user, loading} = useAuth();
  
  return (
    <div className='container'>
      <AdminSidebar />
      <div className='admin-navbar'>
        <Navbar />
        <Outlet />
      </div>
    </div>    
  )
}

export default Admin