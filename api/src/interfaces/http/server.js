import { ApolloServer } from 'apollo-server'
import schemas from '../../schemas'
import db from '../../infra/database/connection'
import * as core from './core'

const environment = process.env.NODE_ENV

const server = new ApolloServer({ ...schemas,
  context: ({ req, connection }) => {
    const { authMiddleware, ...coreMethods } = core
    const user = authMiddleware(req, connection)

    const methods = {
      ...coreMethods
    }

    return {
      db,
      methods,
      user
    }
  },
  subscriptions: {
    onConnect: (connectionParams) => {
      const { Authorization } = connectionParams
      if (Authorization) {
        return {
          token: Authorization
        }
      }
      throw new Error('Missing auth token!')
    }
  },
  formatError: (error) => {
    delete error.extensions.exception.stacktrace
    const errorlog = {
      message: error.message,
      code: error.extensions.code,
      Detail: error.extensions.exception || null,
      Path: error.path ? error.path[0] : null,
    }
    console.error('\x1b[31m%s\x1b[0m', `[${'s'}] ERROR: Server: ${JSON.stringify(errorlog)}`)
    return errorlog
  },
  introspection: environment !== 'production',
  playground: environment !== 'production',
  debug: environment !== 'production'
})

server.start = () => {
  server.listen(process.env.API_PORT || 5000, '0.0.0.0').then(() => {
    console.log('\x1b[36m%s\x1b[0m', `SERVERINIT: 👍 GraphQL API ready! 👍`)
    console.log('\x1b[37m%s\x1b[0m', 'SERVERINIT: 🚀 Subscriptions ready! 🚀')
  })
}

export default server