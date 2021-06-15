import { ApolloClient, ApolloProvider, HttpLink } from '@apollo/client'
import { WebSocketLink } from 'apollo-link-ws'
import { split } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { getMainDefinition } from 'apollo-utilities'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { useAuth } from '../../hooks/auth'

const ApolloClientProvider = ({ children }) => {
  const { token } = useAuth()

  const cache = new InMemoryCache()

  const httpLink = new HttpLink({
    uri: `http://${process.env.REACT_APP_API_URL}/`
  })

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    }
  })

  const httpAuthLink = authLink.concat(httpLink)
  
  const wsLink = new WebSocketLink({
    uri: process.env.REACT_APP_WS_URL,
    options: {
      reconnect: true,
      connectionParams: {
        Authorization: token ? `${token}` : null
      }
    }
  })

  const client = new ApolloClient({
    link: split(({ query }) => {
        const definition = getMainDefinition(query)
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        )
      },
      wsLink,
      httpAuthLink
    ),
    cache
  })

  return (
    <ApolloProvider client={client}>
      { children }
    </ApolloProvider>
  )
}

export default ApolloClientProvider