import React from 'react'
import Routes from './routes'
import GlobalStyle from './styles/global'
import { ThemeProvider } from './store/theme'
import { AuthProvider } from './store/auth'

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <GlobalStyle/>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App