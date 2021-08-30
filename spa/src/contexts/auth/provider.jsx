import React, { useState, useEffect } from 'react'
import AuthContext from './context'

const initialState = {
  user: null,
  token: null,
  loading: true
}

const AuthProvider = ({ children }) => {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    const fetchUserData = () => {
      const user = window.localStorage.getItem('user')
      const token = window.localStorage.getItem('token')
      setState(() => user && token
        ? ({
            user: JSON.parse(user),
            token,
            loading: false
          })
        : ({
            ...initialState,
            loading: false
          }))
    }

    fetchUserData()
  }, [])

  const login = (user, token) => {
    setState(state => ({ ...state, user, token }))
    window.localStorage.setItem('user', JSON.stringify(user))
    window.localStorage.setItem('token', token)
  }

  const logout = () => {
    setState({ ...initialState, loading: false })
    window.localStorage.removeItem('user')
    window.localStorage.removeItem('token')
  }

  const isAuthenticated = () => !!state.token

  const contextData = {
    ...state,
    login,
    logout,
    isAuthenticated
  }

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
