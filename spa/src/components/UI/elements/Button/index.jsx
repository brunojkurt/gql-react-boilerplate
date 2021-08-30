import React from 'react'
import { StyledButton, Loading } from './styles'

const Button = (props) => {
  const { children, loading, ...rest } = props
  return (
    <StyledButton {...rest}>
      {children}
      {loading && <Loading size={24} />}
    </StyledButton>
  )
}

export default Button
