import React from 'react'
import { StyledBox } from './styles'

const Box = ({ children, ...rest }) => {
  return (
    <StyledBox {...rest}>
      {children}
    </StyledBox>
  )
}

export default Box
