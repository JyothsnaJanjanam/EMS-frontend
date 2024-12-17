import React from 'react'
import { useAuth } from '../context/UserContext'
import { Navigate } from 'react-router-dom'

const RoleBasedRoutes = ({children, requiredRole}) => {

  const {user, loading} = useAuth()

  if(loading) {
    return <div>Loading...</div>
  } 

  if(!requiredRole.includes(user.role)) {
  <Navigate to={'/unauthorized'} />
  }

  return user ? children : <Navigate to={'/login'} />

  return (
    <div>RoleBasedRoutes</div>
  )
}

export default RoleBasedRoutes