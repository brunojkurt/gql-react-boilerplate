import { ApolloServer } from 'apollo-server'
import schemas from '../../schemas'
import authMiddleware from './core/middlewares/authMiddleware'
import db from '../../infra/database/connection'
import errorHandling from './core/errorHandling'

const environment = process.env.NODE_ENV

const server = new ApolloServer({ ...schemas,
  context: ({ req, connection }) => {
    const { payload } = authMiddleware(req)
    
    return {
      db,
      errorHandling,
      user: payload
    }
  },
  subscriptions: {
    onConnect: (connectionParams) => {
      const { Authorization } = connectionParams
      if (Authorization) {
        return { token: Authorization }
      }
      throw new Error('Missing auth token!')
    },
    keepAlive: 2 * 1000
  },
  introspection: environment !== 'production',
  playground: environment !== 'production'
})

server.start = () => {
  server.listen(process.env.API_PORT || 5000, '0.0.0.0').then(({ url }) => {
    console.log('\x1b[36m%s\x1b[0m', `SERVERINIT: 👍 GraphQL API ready! 👍`)
    console.log('\x1b[37m%s\x1b[0m', 'SERVERINIT: 🚀 Subscriptions ready! 🚀')
  })
}

export default server