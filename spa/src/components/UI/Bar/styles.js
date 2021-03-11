import styled from 'styled-components'
import { AppBar as AppBarBase } from '@material-ui/core'

export const AppBar = styled(AppBarBase)`
  background-color: ${(props) => `${props.background} !important`};
`