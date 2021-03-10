import React from 'react'
import Routes from './routes'
import GlobalStyle from './styles/global'
import { AuthProvider } from './store/auth'
import { ApolloClientProvider } from './store/apollo'
import { ThemeProvider } from './store/theme'

const App = () => {
  return (
    <AuthProvider>
      <ApolloClientProvider>
        <ThemeProvider>
          <GlobalStyle/>
          <Routes />
        </ThemeProvider>
      </ApolloClientProvider>
    </AuthProvider>
  )
}

export default App