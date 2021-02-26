import { ApolloError } from 'apollo-server'

export default (msg, code, error) => {
  throw new ApolloError(msg, code, error)
}