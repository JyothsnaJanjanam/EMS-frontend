import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../../CSS/ViewSalary.css'
import axios from 'axios'
import { useAuth } from '../../context/UserContext'

const ViewSalary = () => {

  const {id} = useParams()
  const [salaries, setSalaries] = useState(null)
  const [filteredSalaries, setFilteredSalaries] = useState(null)
  let sno = 1
  const {user} = useAuth()

  const fetchSalaries = async () => {
    try {
      const response = await axios.get(`https://ems-backend-fawn.vercel.app/api/salary/${id}/${user.role}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`
        }
      })
      // console.log(response.data.salary)
      if(response.data.success) {
        setSalaries(response.data.salary)
        setFilteredSalaries(response.data.salary);
      }
    } catch (error) {
      if(error.response && !error.response.data.success) {
        alert(error.message)
      }
    }
  }
  
  useEffect(() => {
    fetchSalaries()
  }, [])

  const filterSalaries  = (e) => {
    const q = e.target.value;
    const filteredRecords = salaries.filter((leave) => 
    leave.employeeId.toLocaleLowerCase().includes(q.toLocaleLowerCase())
  )
  setFilteredSalaries(filteredRecords)
  }

  return (
    <>
      {filteredSalaries === null ? (
        <div>Loading....</div>
      ) : (
        <div className='salary-table'>

          <div className='sal-head-cont'>
            <h2 className='sal-head'>
              Salary History
            </h2>
          </div>

          <div className='sal-inp-cont'>
            <input type="text" placeholder='Search By Emp ID' className='sal-inp' onChange={filterSalaries} />
          </div>

          {filteredSalaries.length > 0 ? (
            <table className='table'>
              <thead className='table-head-row'>
                <tr>
                  <th className='table-head'>SNO</th>
                  <th className='table-head'>Emp ID</th>
                  <th className='table-head'>Salary</th>
                  <th className='table-head'>Allowance</th>
                  <th className='table-head'>Deduction</th>
                  <th className='table-head'>Total</th>
                  <th className='table-head'>Pay Date</th>
                </tr>
              </thead>
              
              {filteredSalaries.map((salary) => (
                <tbody key={salary._id}>
                  <tr key={salary.id} className='table-data-row'>
                    <td className='table-data'>{sno++}</td>
                    <td className='table-data'>{salary.employeeId.employeeId}</td>
                    <td className='table-data'>{salary.basicSalary}</td>
                    <td className='table-data'>{salary.allowances}</td>
                    <td className='table-data'>{salary.deductions}</td>
                    <td className='table-data'>{salary.netSalary}</td>
                    <td className='table-data'>
                      {new Date(salary.payDate).toLocaleDateString()}
                    </td>
                  </tr>
                </tbody>
              ))}
              
            </table>
          ) : <div>No Records</div>}
        </div>

      )}
    </>
  )
}

export default ViewSalary