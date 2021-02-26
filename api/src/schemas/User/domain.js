export const UserDomain = `
  type User {
    id: ID
    name: String
    email: String
  }

  type AuthenticationData {
    token: String
    user: User
  }

  input UserDataInputs {
    name: String
    email: String
    password: String
  }
`
export const UserMutations = `
  UserAuthenticate(
    email: String!
    password: String!
  ): AuthenticationData

  UserRegister(
    userData: UserDataInputs!
  ): AuthenticationData

  UserCreate(
    userData: UserDataInputs!
  ): User

  UserUpdate(
    id: ID
    userData: UserDataInputs
  ): User

  UserDelete(
    id: ID
  ): Boolean
`
export const UserQuerys = `
  Users: [User]

  UserById(
    id: ID
  ): User
`