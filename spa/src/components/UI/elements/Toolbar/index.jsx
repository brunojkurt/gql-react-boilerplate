import React from 'react'
import { StyledToolbar } from './styles'

const Toolbar = ({ children, ...rest }) => {
  return (
    <StyledToolbar {...rest}>
      {children}
    </StyledToolbar>
  )
}

export default Toolbar
