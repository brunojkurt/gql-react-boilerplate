import { ApolloError, } from 'apollo-server'

export default (msg, code, error = null) => {
  throw new ApolloError(msg, code, error)
}