export const UserDomain = `
  type User {
    id: ID
    name: String
    email: String
    role_id: String
    created_at: Date
    updated_at: Date
    permissions: [String]
  }

  type AuthenticationData {
    token: String
    user: User
  }

  input UserDataInputs {
    name: String
    email: String
    password: String
    role_id: String
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
    id: ID!
    userData: UserDataInputs
  ): User

  UserDelete(
    id: ID!
    options: DeleteOptions
  ): Boolean
`
export const UserQuerys = `
  Users(
    id: ID
    email: String
    withDeleted: Boolean
  ): [User]
`
