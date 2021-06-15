import { useState, useEffect } from 'react'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'

const CustomThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('light')

  useEffect(() => {
    const fetchTheme = () => {
      const theme = localStorage.getItem('theme')
      theme && setCurrentTheme(theme)
    }
    fetchTheme()
  }, [])

  const light = createMuiTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#00072d'
      },
      secondary: {
        main: '#0a2472',
      }
    }
  })

  const dark = createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#FFF'
      },
      secondary: {
        main: '#FFF000',
      },
    }
  })

  const themes = {
    light,
    dark
  }

  const setTheme = (theme) => {
    setCurrentTheme(theme)
    localStorage.setItem('theme', theme)
  }

  const methods = {
    setTheme,
    currentTheme
  }

  return (
    <ThemeProvider theme={{ ...themes[currentTheme], methods }}>
      { children }
    </ThemeProvider>
  )
}

export default CustomThemeProvider