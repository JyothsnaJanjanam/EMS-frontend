import React, { useState, useEffect } from 'react'
import '../../CSS/DepartmentList.css'
import { Link } from 'react-router-dom'
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper'
import DataTable from 'react-data-table-component'
import axios from 'axios'


const List = () => {

  const [employees, setEmployees] = useState([])
  const [empLoading, setEmpLoading] = useState(false)
  const [filteredEmployees, setFilteredEmployees] = useState([])

  // const onEmployeeDelete = (id) => {
  //   setEmployees((employees) => {
  //     const data = employees.filter(emp => emp._id !== id);
  //     setFilteredEmployees(data);
  //     return data;
  //   });
  // };

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get('https://ems-backend-fawn.vercel.app/api/employee', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
          },
        });
        // console.log(response)
        if (response.data.success) {
          let sno = 1;
          const data = await response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department.dep_name,
            name: emp.userId.name,
            dob: new Date(emp.dob).toLocaleDateString(),
            profileImage: <img className='emp-img' src={`https://ems-backend-fawn.vercel.app/${emp.userId.profileImage}`} />,
            action: (<EmployeeButtons Id={emp._id} />),
          }));          
          setEmployees(data);
          setFilteredEmployees(data)
        }
      } catch (error) {
        if(error.response && !error.response.data.message) {
          alert(error.response.data.message)
        }
      } finally {
        setEmpLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const records = employees.filter((emp) => (emp.name.toLowerCase().includes(e.target.value.toLowerCase())))
    setFilteredEmployees(records)
  }

  return (
    <>{empLoading ? <div>Loading...</div> :
      <div className='dep-container'>
        <div>
          <h3 className='dep-head'>Manage Employees</h3>
        </div>
        <div className='dep-details'>
          <input type="text" placeholder='Search By Dep Name' className='dep-input' onChange={handleFilter} />
          <Link to={'/admin/employee/add-employee'} className='dep-link'>Add New Employee</Link>
        </div>
        <div>
          <DataTable columns={columns} data={filteredEmployees} className='dep-table' pagination />
        </div>
      </div>
    } </>
  )
}

export default List