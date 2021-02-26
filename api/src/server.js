import { ApolloServer } from 'apollo-server'
import schemas from './schemas'
import authMiddleware from './middlewares/authMiddleware'
import db from './database/connection'
import errorHandling from './utils/errorHandling'
require('dotenv').config()

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
  formatError: (error) => {
    delete error.extensions.exception.stacktrace
    const errorlog = {
      message: error.message,
      code: error.extensions.code,
      Path: error.path ? error.path[0] : null
    }
    console.error('\x1b[31m%s\x1b[0m', `[${'s'}] ERROR: Server: ${JSON.stringify(errorlog)}`)
    return errorlog
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

server.listen(process.env.API_PORT || 3333).then(({ url }) => {
  console.log('\x1b[36m%s\x1b[0m', `SERVERINIT: 👍 GraphQL API ready at ${url} 👍`)
  console.log('\x1b[37m%s\x1b[0m', 'SERVERINIT: 🚀 Subscriptions ready! 🚀')
})