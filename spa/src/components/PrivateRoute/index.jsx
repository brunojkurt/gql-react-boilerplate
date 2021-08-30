import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from 'hooks/auth'

import { Backdrop } from 'components/UI/elements'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { token, loading } = useAuth()

  if (loading) {
    return <Backdrop />
  }

  return (
    <Route
      {...rest}
      render={props =>
        token
          ? <Component {...props} />
          : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }
              }}
            />
            )}
    />
  )
}

export default PrivateRoute
