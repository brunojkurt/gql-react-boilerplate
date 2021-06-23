import React from 'react'
import { StyledTypography } from './styles'

const Typography = ({ children, ...rest }) => {
  return (
    <StyledTypography {...rest}>
      {children}
    </StyledTypography>
  )
}

export default Typography
