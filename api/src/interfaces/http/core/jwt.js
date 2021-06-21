import jwt from 'jsonwebtoken'
import { ApolloError } from 'apollo-server'
import { errorHandling } from './'

const getSecret = () => {
  const secret = `${process.env.TOKEN_SECRET}`

  if (!secret || secret === '') {
    errorHandling('No token secret provided', 'sign_token_method')
  }

  return secret
}

export const signToken = (data) => {
  const secret = getSecret()

  return jwt.sign(data, secret)
}

export const verifyToken = (token) => {
  try {
    const secret = getSecret()
    const payload = jwt.verify(token, secret)

    return payload
  } catch (err) {
    throw new ApolloError('Invalid Authorization Token.', 401, err)
  }
}
