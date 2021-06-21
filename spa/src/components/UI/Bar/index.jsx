import React from 'react'
import { AppBar } from './styles'

const Bar = ({ children, ...rest }) => {
  return (
    <AppBar {...rest}>
      {children}
    </AppBar>
  )
}

export default Bar
