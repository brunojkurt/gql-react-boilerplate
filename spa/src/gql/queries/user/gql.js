export const Users = gql`
  query Users (
    $id: ID
    $email: String
    $withDeleted: Boolean
  ) {
    Users (
      id: $id
      email: $email
      withDeleted: $withDeleted
    ) {
      id
      name
      email
      role_id
      created_at
      updated_at
    } 
  }
`
