import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import PrivateRoute from 'components/PrivateRoute'
import Login from 'pages/Login'
import Home from 'pages/Home'
import Dashboard from 'pages/admin/Dashboard'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/login' exact component={Login} />
        <PrivateRoute path='/dashboard' component={Dashboard} />
        <Route path='*' component={() => <h1>404 Not Found</h1>} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
