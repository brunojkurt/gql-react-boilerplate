import { ApolloError } from 'apollo-server'
import { verifyToken } from '..'

const authMiddleware = (req, connection) => {
  if (connection && connection.context) {
    return verifyToken(connection.context.token)
  }

  if (!req) {
    return null
  }

  const auth = req.headers.authorization

  if (!auth) {
    return null
  }

  const parts = auth.split(' ')

  if (!(parts.length === 2)) {
    throw new ApolloError('Token error.', 401)
  }

  const [scheme, token] = parts
  if (!/^Bearer$/i.test(scheme)) {
    throw new ApolloError('Token malformatted.', 401)
  }

  const user = verifyToken(token)

  return user
}

export default authMiddleware
