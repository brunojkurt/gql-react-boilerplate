import React from 'react'
import { StyledDrawer } from './styles'

const Drawer = ({ children, ...rest }) => {
  return (
    <StyledDrawer {...rest}>
      {children}
    </StyledDrawer>
  )
}

export default Drawer
