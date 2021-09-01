import { useMutation } from '@apollo/client'
import { UserAuthenticate } from './gql'

export const useAuthenticate = () => {
  const [authenticate, variables] = useMutation(UserAuthenticate)

  return {
    authenticate,
    ...variables
  }
}
