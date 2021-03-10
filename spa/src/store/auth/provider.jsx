import React, { useState, useEffect } from 'react'
import AuthContext from  './context'

const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    user: {},
    token: null
  })

  useEffect(() => {
    const fetchUserData = () => {
      const user = localStorage.getItem('user')
      const token = localStorage.getItem('token')
      if (user && token) {
        setState({
          user: JSON.parse(user),
          token
        })
      }
    }

    fetchUserData()
  }, [])

  const login = (user, token) => {
    setState({ user, token })
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
  }

  const logout = () => {
    setState({})
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  const isAuthenticated = () => {
    return state.token ? true : false
  }

  const contextData = {
    ...state,
    login,
    logout,
    isAuthenticated
  }

  return (
    <AuthContext.Provider value={contextData}>
      { children }
    </AuthContext.Provider>
  )
}

export default AuthProvider