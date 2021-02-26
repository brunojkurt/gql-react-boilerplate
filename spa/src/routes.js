import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './components/pages/Home' 

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="*" component={() => <h1>404 Not Found</h1>} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes