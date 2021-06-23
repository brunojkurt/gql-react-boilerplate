import React from 'react'
import { StyledPaper } from './styles'

const Paper = ({ children, ...rest }) => {
  return (
    <StyledPaper {...rest}>
      {children}
    </StyledPaper>
  )
}

export default Paper
