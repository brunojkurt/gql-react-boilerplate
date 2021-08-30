import React from 'react'
import { StyledListItem } from './styles'

const ListItem = ({ children, ...rest }) => {
  return (
    <StyledListItem {...rest}>
      {children}
    </StyledListItem>
  )
}

export default ListItem
