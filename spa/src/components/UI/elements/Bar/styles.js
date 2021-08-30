import styled, { css } from 'styled-components'
import { AppBar } from '@material-ui/core'

export const StyledBar = styled(AppBar)`
  ${({ theme, color }) => !color
    ? css`background: ${theme.palette.background.paper} !important;`
    : css`background: inherit;`
  }
`
