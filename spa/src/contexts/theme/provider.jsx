import { useState, useEffect } from 'react'
import { ThemeProvider, StylesProvider } from '@material-ui/styles'
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'
import theme from 'theme'

const CustomThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('light')

  useEffect(() => {
    const fetchTheme = () => {
      const theme = localStorage.getItem('theme')
      theme && setCurrentTheme(theme)
    }
    fetchTheme()
  }, [])

  const setTheme = (theme) => {
    setCurrentTheme(theme)
    localStorage.setItem('theme', theme)
  }

  const methods = {
    setTheme
  }

  return (
    <ThemeProvider theme={{ ...theme(currentTheme), methods, currentTheme }}>
      <StylesProvider injectFirst>
        <StyledComponentsThemeProvider theme={theme(currentTheme)}>
          {children}
        </StyledComponentsThemeProvider>
      </StylesProvider>
    </ThemeProvider>
  )
}

export default CustomThemeProvider