import React from 'react'
import { StyledList } from './styles'

const List = ({ children, ...rest }) => {
  return (
    <StyledList {...rest}>
      {children}
    </StyledList>
  )
}

export default List
