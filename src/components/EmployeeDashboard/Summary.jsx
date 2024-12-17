import React from 'react'
import '../../CSS/SummaryCard.css'
import { FaUser } from 'react-icons/fa'
import { useAuth } from '../../context/UserContext'

const SummaryCard = () => {
  const user = useAuth()
  return (
    <div className='summary-container welcome-cont'>
      <div className='icon' style={{backgroundColor: 'blue'}}>
        <FaUser />
      </div>
      <div className='details'>
        <p className='details-text'>Welcome Back</p>
        <p className='details-number welcome-name'>{user.user.name}</p>
      </div>
    </div>
  )
}

export default SummaryCard