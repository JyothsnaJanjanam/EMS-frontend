import React from 'react'
import '../../CSS/SummaryCard.css'

const SummaryCard = ({icon, text, number, color}) => {
  return (
    <div className='summary-container'>
      <div className='icon' style={{backgroundColor: `${color}`}}>
        {icon}
      </div>
      <div className='details'>
        <p className='details-text'>{text}</p>
        <p className='details-number'>{number}</p>
      </div>
    </div>
  )
}

export default SummaryCard