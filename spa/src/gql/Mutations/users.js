import { gql } from '@apollo/client'

export const UserRegister = gql`
  mutation UserRegister(
    $userData: UserDataInputs!
  ) {
    UserRegister(
      userData: $userData
    ) {
      token
      user {
        id
        name
        email
      }
    }
  }
`
export const UserAuthenticate = gql`
  mutation UserAuthenticate(
    $email: String!
    $password: String!
  ) {
    UserAuthenticate(
      email: $email
      password: $password
    ) {
      token
      user {
        id
        name
        email
        role_id
      }
    }
  }
`
export const UserCreate = gql`
  mutation UserCreate(
    $userData: UserDataInputs!
  ) {
    UserCreate(
      userData: $userData
    ) {
      id
      name
      email
    }
  }
`
export const UserUpdate = gql`
  mutation UserUpdate(
    $id: ID!
    $userData: UserDataInputs!
  ) {
    UserUpdate(
      id: $id
      userData: $userData
    ) {
      id
      name
      email
    }
  }
`
export const UserDelete = gql`
  mutation UserDelete(
    $id: ID!
  ) {
    UserDelete(
      id: $id
    )
  }
`