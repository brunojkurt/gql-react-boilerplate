import styled from 'styled-components'
import { Button as ButtonBase, CircularProgress } from '@material-ui/core'

export const CustomButton = styled(ButtonBase)`
  position: relative;
  justify-content: center;
  align-items: center;
`

export const Loading = styled(CircularProgress)`
  position: absolute;
  justify-self: center;
  align-self: center;
`
