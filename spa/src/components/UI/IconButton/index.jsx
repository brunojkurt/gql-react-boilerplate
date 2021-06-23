import React from 'react'
import { StyledIconButton } from './styles'

const IconButton = ({ children, ...rest }) => {
  return (
    <StyledIconButton {...rest}>
      {children}
    </StyledIconButton>
  )
}

export default IconButton
