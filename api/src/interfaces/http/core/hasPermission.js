import { ApolloError } from 'apollo-server'

const triggerError = () => {
  throw new ApolloError('You dont have the privileges.', 'Not Authorized.')
}

const checkCode = (code, permissions) => {
  if (Array.isArray(code)) {
    return !!code.filter(code_str => permissions.includes(code_str)).length
  }
  return permissions.includes(code)
}

export default (code = [], user) => {
  if (!user) {
    triggerError()
  }

  const hasPermission = checkCode(code, user.permissions)

  if (!hasPermission) {
    triggerError()
  }

  return true
}
