import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuthContext } from '../../store/auth'

const PrivateRoute = ({ component, ...rest }) => {
  const { token } = useAuthContext()
  return (
    <Route
      {...rest}
      render={props =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
            pathname: "/login",
            state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute