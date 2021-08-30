import React from 'react'
import { StyledGrid } from './styles'

const Grid = ({ children, ...rest }) => {
  return (
    <StyledGrid {...rest}>
      {children}
    </StyledGrid>
  )
}

export default Grid
