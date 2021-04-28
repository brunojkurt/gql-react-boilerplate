import { ApolloError, } from 'apollo-server'

const checkCode = (code, permissions) => {
  if (Array.isArray(code)) {
    return !!code.filter(code_str => permissions.includes(code_str)).length
  }
  return permissions.includes(code)
}

export default (code = [], user) => {
  const { permissions } = user
  const hasPermission = checkCode(code, permissions)

  if (!hasPermission) {
    throw new ApolloError('You dont have the privileges.', 'Not Authorized.')
  }

  return true
}