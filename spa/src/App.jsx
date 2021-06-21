import React from 'react'
import Routes from './Routes'
import GlobalStyle from './styles/global'
import { AuthProvider } from './contexts/auth'
import { ApolloClientProvider } from './contexts/apollo'
import { ThemeProvider } from './contexts/theme'

const App = () => {
  return (
    <AuthProvider>
      <ApolloClientProvider>
        <ThemeProvider>
          <GlobalStyle />
          <Routes />
        </ThemeProvider>
      </ApolloClientProvider>
    </AuthProvider>
  )
}

export default App
