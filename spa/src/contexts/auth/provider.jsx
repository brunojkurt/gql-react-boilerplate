import React, { useState, useEffect } from 'react'
import AuthContext from  './context'

const initialState = {
  user: null,
  token: null,
  loading: true
}

const AuthProvider = ({ children }) => {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    const fetchUserData = () => {
      const user = localStorage.getItem('user')
      const token = localStorage.getItem('token')
      setState(() => user && token ? ({
        user: JSON.parse(user),
        token,
        loading: false
      }) : ({
        ...initialState,
        loading: false
      }))
    }

    fetchUserData()
  }, [])

  const login = (user, token) => {
    setState(state => ({ ...state, user, token }))
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
  }

  const logout = () => {
    setState({ ...initialState, loading: false })
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