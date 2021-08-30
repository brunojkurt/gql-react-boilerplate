import styled from 'styled-components'
import { Button, CircularProgress } from '@material-ui/core'

export const StyledButton = styled(Button)`
  position: relative;
  justify-content: center;
  align-items: center;
`

export const Loading = styled(CircularProgress)`
  position: absolute;
  justify-self: center;
  align-self: center;
`
