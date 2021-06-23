import React from 'react'
import Routes from './Routes'
import GlobalStyle from './styles/global'
import { AuthProvider } from 'contexts/auth'
import { ApolloClientProvider } from 'contexts/apollo'
import { ThemeProvider } from 'contexts/theme'
import { I18nProvider } from 'contexts/i18n'

const App = () => {
  return (
    <AuthProvider>
      <ApolloClientProvider>
        <ThemeProvider>
          <I18nProvider>
            <GlobalStyle />
            <Routes />
          </I18nProvider>
        </ThemeProvider>
      </ApolloClientProvider>
    </AuthProvider>
  )
}

export default App
