import UserMutation from './User/mutations'
import UserQuery from './User/querys'
import UserChains from './User/chains'
// import Queries and Mutations here

const userMutation = new UserMutation()
const userQuery = new UserQuery()

const resolvers = {

  // Queries
  Query: {
    Users: userQuery.get
  },

  // Mutations
  Mutation: {
    UserRegister: userMutation.register,
    UserAuthenticate: userMutation.authenticate,
    UserCreate: userMutation.create,
    UserUpdate: userMutation.update,
    UserDelete: userMutation.delete
  },

  // Chains
  User: UserChains

  // Subscription: {

  // }
}

// export const pubsub = new apolloServer.PubSub()

export default resolvers
