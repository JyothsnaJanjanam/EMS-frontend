import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/UserContext';

export const columns = [
  {
    name: 'S.No',
    selector: (row) => row.sno,
    width: '70px'
  },
  {
    name: 'Name',
    selector: (row) => row.name,
    sortable: true,
    width: '180px',
  },
  {
    name: 'Image',
    selector: (row) => row.profileImage,
    width: '100px'
  },
  {
    name: 'Department',
    selector: (row) => row.dep_name,
    width: '150px'
  },
  {
    name: 'DOB',
    selector: (row) => row.dob,
    width: '120px',
    sortable: true
  },
  {
    name: 'Action',
    selector: (row) => row.action,
    center: 'true'
  },
]


export const fetchDepartments = async () => {
  let departments;
  try {
    const response = await axios.get('http://localhost:7001/api/department', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
      },
    });
    if (response.data.success) {
      departments = response.data.departments
    }
  } catch (error) {
    if(error.response && !error.response.data.message) {
      alert(error.response.data.error)
    }
  }
  return departments
};

export const getEmployees = async (id) => {
  let employees;
  try {
    const response = await axios.get(`http://localhost:7001/api/employee/department/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
      },
    });
    if (response.data.success) {
      employees = response.data.employees
      // console.log(employees)
    }
  } catch (error) {
    if(error.response && !error.response.data.message) {
      alert(error.response.data.error)
    }
  }
  return employees
};

// Employees for Salary Form


export const EmployeeButtons = ({ Id }) => {
  const navigate = useNavigate();

  return (
    <div style={{display: 'flex'}}>
      <button 
        style={{
          padding: '5px 10px',
          backgroundColor: 'rgb(10, 143, 10)',
          color: 'white',
          border: 'none',
          marginRight: '10px',
          borderRadius: '3px',
          cursor: 'pointer'
        }}
        onClick={() => navigate(`/admin/employees/${Id}`)}
      >View</button>

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
        onClick={() => navigate(`/admin/employees/edit/${Id}`)}
        >Edit</button>

      <button 
        style={{
          padding: '5px 10px',
          backgroundColor: 'rgb(218, 160, 14)',
          color: 'white',
          border: 'none',
          marginRight: '10px',
          borderRadius: '3px',
          cursor: 'pointer'
        }}
        onClick={() => navigate(`/admin/employees/salary/${Id}`)}
        >Salary</button>

      <button 
        style={{
          padding: '5px 10px',
          backgroundColor: 'rgb(216, 10, 10)',
          color: 'white',
          border: 'none',
          marginRight: '10px',
          borderRadius: '3px',
          cursor: 'pointer'
        }}
        onClick={() => navigate(`/admin/employees/leaves/${Id}`)}
        >Leave</button>
    </div>
  )
}