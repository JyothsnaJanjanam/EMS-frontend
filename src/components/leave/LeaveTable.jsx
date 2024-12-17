import React, { useEffect, useState } from 'react'
import '../../CSS/LeaveTable.css'
import { columns, LeaveButtons } from '../../utils/LeaveHelper';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const LeaveTable = () => {

  const [leaves, setLeaves] = useState([])
  const [filteredLeaves, setFilteredLeaves] = useState([])

  const fetchLeaves = async () => {
    try {
      const response = await axios.get('https://ems-backend-one.vercel.app/api/leave', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
        },
      });
      if (response.data.success) {
        let sno = 1;
        const data = await response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId.employeeId,
          name: leave.employeeId.userId.name,
          leaveType: leave.leaveType,
          department: leave.employeeId.department.dep_name,
          days: new Date(leave.endDate).getDate() - new Date(leave.startDate).getDate(),
          status: leave.status,
          action: (<LeaveButtons Id={leave._id} />),
        }));
        setLeaves(data);
        setFilteredLeaves(data)
      }
    } catch (error) {
      if (error.response && !error.response.data.message) {
        alert(error.response.data.message)
      }
    }
  }

  useEffect(() => {
    fetchLeaves()
  }, [])

  const filterByInput = (e) => {
    const data = leaves.filter((leave) => 
      leave.employeeId
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
      )
      setFilteredLeaves(data)
  }
  const filterByButton = (status) => {
    const data = leaves.filter((leave) => 
      leave.status
        .toLowerCase()
        .includes(status.toLowerCase())
      )
      setFilteredLeaves(data)
  }

  return (
    <>
      {setFilteredLeaves ? (
        <div className='leave-tab-container'>
          <div>
            <h3 className='leave-tab-head'>Manage Leaves</h3>
          </div>
          <div className='leave-tab-details'>
            <input type="text" placeholder='Search By Emp Id' className='leave-tab-input' onChange={filterByInput} />
            <div>
              <button className='leave-tab-but' onClick={() => filterByButton('Pending')}>Pending</button>
              <button className='leave-tab-but' onClick={() => filterByButton('Approved')}>Approved</button>
              <button className='leave-tab-but' onClick={() => filterByButton('Rejected')}>Rejected</button>
            </div>
          </div>

          <div className='leave-tab'>
            <DataTable columns={columns} data={filteredLeaves} pagination></DataTable>
          </div>
        </div>
      ) : <div>Loading....</div>}
    </>
  )
}

export default LeaveTable