import React from 'react'
import '../../CSS/Navbar.css'
import { useAuth } from '../../context/UserContext'

const Navbar = () => {
  const {user, logout} = useAuth()
  return (
    <div className='navbar'>
      <p>Welcome, {user.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Navbar