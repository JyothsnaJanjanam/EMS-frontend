import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export const columns = [
  {
    name: 'S.No',
    selector: (row) => row.sno,
    width: '70px'
  },
  {
    name: 'Emp ID',
    selector: (row) => row.employeeId,
    width: '120px',
  },
  {
    name: 'Name',
    selector: (row) => row.name,
    width: '120px'
  },
  {
    name: 'Leave Type',
    selector: (row) => row.leaveType,
    width: '140px'
  },
  {
    name: 'Department',
    selector: (row) => row.department,
    width: '170px',
  },
  {
    name: 'Days',
    selector: (row) => row.days,
    width: '80px',
  },
  {
    name: 'status',
    selector: (row) => row.status,
    width: '120px',
  },
  {
    name: 'Action',
    selector: (row) => row.action,
    center: 'true'
  },
]

export const LeaveButtons = ({ Id }) => {
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/admin/leaves/details/${id}`)
    // navigate(`/admin/leaves/${id}`)
  }

  return (
    <button style={{
      padding: '5px 10px',
      backgroundColor: 'rgb(10, 143, 10)',
      color: 'white',
      border: 'none',
      marginRight: '10px',
      borderRadius: '3px',
      cursor: 'pointer'
    }}
     onClick={() => handleView(Id)}>
      View
    </button>
  )
}