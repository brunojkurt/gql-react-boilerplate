import { gql } from 'apollo-server'
// import domains here and apply them inside apollo definitions by putting them 
// inside typeDefs like this: ${Domain}
import { UserDomain, UserMutations, UserQuerys } from './User/domain'

//To define a subscription add the method inside a Subscription type
const typeDefs = gql`
  scalar Date
  
  input DeleteOptions {
    hard: Boolean
  }

  ${UserDomain}

  type Query {
    ${UserQuerys}
  } 
  
  type Mutation {
    ${UserMutations}
  }
`

export default typeDefs