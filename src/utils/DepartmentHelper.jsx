import { useNavigate } from "react-router-dom"
import axios from "axios";

export const columns = [
  {
    name: 'S.No',
    selector: (row) => row.sno
  },
  {
    name: 'Department Name',
    selector: (row) => row.dep_name,
    sortable: true
  },
  {
    name: 'Action',
    selector: (row) => row.action
  },
]


export const DepartmentButtons = ({ Id, onDepartmentDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirm = window.confirm('Do you want to delete?')

    if (confirm) {
      try {
        const response = await axios.delete(`https://ems-backend-one.vercel.app/api/department/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth-token')}`
          }
        })
        if(response.data.success) {
          onDepartmentDelete()
        }
      } catch (error) {
        if(error.response && !error.response.data.success) {
          alert(error.response.data.message)
        }
      }
    }    
  }

  return (
    <div style={{display: 'flex'}}>
      <button 
        style={{
          padding: '5px 10px',
          backgroundColor: 'blue',
          color: 'white',
          border: 'none',
          marginRight: '10px',
          borderRadius: '3px',
          cursor: 'pointer'
        }}
        onClick={() => navigate(`/admin/department/${Id}`)}
      >Edit</button>

      <button 
        style={{
          padding: '5px 10px',
          backgroundColor: 'red',
          color: 'white',
          border: 'none',
          borderRadius: '3px',
          cursor: 'pointer'
        }}
        onClick={() => handleDelete(Id)}
        >Delete</button>
    </div>
  )
}