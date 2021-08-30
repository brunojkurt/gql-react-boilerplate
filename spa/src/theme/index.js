import { createTheme } from '@material-ui/core/styles'

const themePalette = currTheme => createTheme({
  palette: {
    type: currTheme || 'light',
    primary: {
      main: '#e10098'
    },
    secondary: {
      main: '#61DAFB'
    }
  }
})

export default themePalette
