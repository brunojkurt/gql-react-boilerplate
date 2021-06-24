import { useState, useEffect } from 'react'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider, StylesProvider } from '@material-ui/styles'
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'

const CustomThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('light')

  useEffect(() => {
    const fetchTheme = () => {
      const theme = window.localStorage.getItem('theme')
      theme && setCurrentTheme(theme)
    }
    fetchTheme()
  }, [])

  // https://material-ui.com/customization/default-theme/#default-theme
  const light = createMuiTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#020079'
      },
      secondary: {
        main: '#0078e9'
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
        main: '#020079'
      }
    }
  })

  const themes = {
    light,
    dark
  }

  const setTheme = (theme) => {
    setCurrentTheme(theme)
    window.localStorage.setItem('theme', theme)
  }

  const methods = {
    setTheme
  }

  return (
    <ThemeProvider theme={{ ...themes[currentTheme], methods, currentTheme }}>
      <StylesProvider injectFirst>
        <StyledComponentsThemeProvider theme={themes[currentTheme]}>
          {children}
        </StyledComponentsThemeProvider>
      </StylesProvider>
    </ThemeProvider>
  )
}

export default CustomThemeProvider
