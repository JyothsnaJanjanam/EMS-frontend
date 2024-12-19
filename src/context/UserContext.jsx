import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios'

export const UserContext = createContext({})

export function UserContextProvider({children}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)  

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem('auth-token')

        if (token) {                              
          const response = await axios.get('http://localhost:7001/api/auth/verify', {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          })
          if(response.data.success) {
            setUser(response.data.user)
          }
        } else {
          setUser(null)
          setLoading(false)
        }
        
      } catch (error) {
        console.log(error.message)
        if(error.response && !error.response.data.success) {
          setUser(null)
        }
      } finally {
        setLoading(false)
      }
    }
    verifyUser()
  }, [])

  const login = (user) => {
    setUser(user) 
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('auth-token')
  }

  return (
    <UserContext.Provider value={{user, login, logout, loading}}>
      {children}
    </UserContext.Provider>
  )

}

export const useAuth = () => useContext(UserContext)