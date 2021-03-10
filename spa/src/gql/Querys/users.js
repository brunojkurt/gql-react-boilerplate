import { gql } from '@apollo/client'

export const Users = gql`
  query Users {
    Users {
      id
      name
      email
      created_at
      updated_at
    }
  }
`
export const UserById = gql`
  query UserById(
    $id: ID!
  ) {
    UserById(id: $id) {
      id
      name
      email
      created_at
      updated_at
    }
  }
`