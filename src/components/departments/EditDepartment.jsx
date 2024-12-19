import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import '../../CSS/AddDepartment.css'

const EditDepartment = () => {
  const {id} = useParams()
  const [department, setDepartment] = useState([])
  const [depLoading, setDepLoading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true)
      try {
        const response = await axios.get(`http://localhost:7001/api/department/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth-token')}`
          }
        })
        if(response.data.success) {
          setDepartment(response.data.department)
        }
      } catch (error) {
        if(error.response && !error.response.data.success) {
          alert(error.response.data.message)
        }
      } finally {
        setDepLoading(false)
      }
    }
    fetchDepartments();
  }, [])
  

  const handleChange = (e) => {
    const {name, value} = e.target;
    setDepartment({...department, [name] : value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:7001/api/department/${id}`, department, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
        }
      })
      if(response.data.success) {
        navigate('/admin/departments')
      }
    } catch (error) {
      if(error.response && !error.response.data.success) {
        alert(error.response.data.message)
      }
    }
  }

  return (
    <>
      {depLoading ? <div>Loading...</div> :
      <div className='add-dep-container'>
        <h2 className='add-head'>Edit Department</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label 
              htmlFor="dep_name" 
              className='add-name'
            >
              Department Name
            </label>
            <input
              name='dep_name' 
              type="text" 
              onChange={handleChange}
              value={department.dep_name}
              placeholder='Department Name' 
              className='add-name-inp' 
              required />
          </div>

          <div className='add-desc-con'>
            <label 
              htmlFor="description" 
              className='add-desc'
            >
              Description
            </label>
            <textarea 
              name="description" 
              placeholder='Description' 
              onChange={handleChange}
              value={department.description}
              className='add-desc-inp' />
          </div>
          <button type='submit' className='add-butt'>Edit Department</button>
        </form>
      </div>
    }</>
  )
}

export default EditDepartment