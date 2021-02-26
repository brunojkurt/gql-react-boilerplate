import { ApolloError } from 'apollo-server'
import jwt from 'jsonwebtoken'
require('dotenv').config()

const authMiddleware = (req) => {
  const auth = req.headers.authorization

  if (!auth) {
    return {
      token: null,
      payload: null
    }
  }

  const parts = auth.split(' ')

  if (!(parts.length === 2)) {
    throw new ApolloError('Token error.', 401)
  }

  const [ scheme, token ] = parts
  if (!/^Bearer$/i.test(scheme)) {
    throw new ApolloError('Token malformatted.', 401)
  }

  try {
    const secret = process.env.TOKEN_SECRET
    const payload = jwt.verify(token, secret)

    return {
      token,
      payload
    }
    
  } catch (err) {
    throw new ApolloError('Invalid Authorization Token.', 401, err)
  }
}

export default authMiddleware