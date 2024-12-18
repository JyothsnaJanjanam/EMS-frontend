import React, { useState, useEffect } from 'react'
import '../../CSS/DepartmentList.css'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { columns, DepartmentButtons } from '../../utils/DepartmentHelper'
import axios from 'axios'

const DepartmentList = () => {
  const [departments, setDepartments] = useState([])
  const [depLoading, setDepLoading] = useState(false)
  const [filteredDepartments, setFilteredDepartments] = useState([])

  const onDepartmentDelete = (id) => {
    fetchDepartments()
  };

  const fetchDepartments = async () => {
    setDepLoading(true);
    try {
      const response = await axios.get('https://ems-backend-neon.vercel.app/api/department', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
        },
      });
      if (response.data.success) {
        let sno = 1;
        const data = response.data.departments.map((dep) => ({
          _id: dep._id,
          sno: sno++,
          dep_name: dep.dep_name,
          action: (
            <DepartmentButtons Id={dep._id} onDepartmentDelete={onDepartmentDelete} />
          ),
        }));
        setDepartments(data);
        setFilteredDepartments(data);
      }
    } catch (error) {
      if(error.response && !error.response.data.message) {
        alert(error.response.data.error)
      }
    } finally {
      setDepLoading(false);
    }
  };
  
  useEffect(() => {

    fetchDepartments();
  }, []);


  const filterDepartments = (e) => {
    const records = departments.filter((dep) => dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilteredDepartments(records)
  }

  return (
    <>{depLoading ? <div>Loading...</div> : 
      <div className='dep-container'>
        <div className='dep-container'>
          <h3 className='dep-head'>Manage Departments</h3>
        </div>
        <div className='dep-details'>
          <input type="text" placeholder='Search By Dep Name' className='dep-input' onChange={filterDepartments} />
          <Link to={'/admin/department/add-department'} className='dep-link'>Add New Department</Link>
        </div>
        <div className='dep-table'>
          <DataTable columns={columns} data={filteredDepartments} pagination/>
        </div>
      </div>
    }
    </>
  )
}

export default DepartmentList