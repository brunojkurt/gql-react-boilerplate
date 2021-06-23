import React from 'react'
import { StyledContainer } from './styles'

const Container = ({ children, ...rest }) => {
  return (
    <StyledContainer {...rest}>
      {children}
    </StyledContainer>
  )
}

export default Container
