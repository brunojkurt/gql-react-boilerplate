import React from 'react'
import { StyledListItemText } from './styles'

const ListItemText = ({ children, ...rest }) => {
  return (
    <StyledListItemText {...rest}>
      {children}
    </StyledListItemText>
  )
}

export default ListItemText
