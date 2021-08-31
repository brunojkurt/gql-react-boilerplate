import { useQuery } from '@apollo/client'
import { Users } from './gql'

export const fetchUsers = () => {
  const props = useQuery(Users)

  return props
}
