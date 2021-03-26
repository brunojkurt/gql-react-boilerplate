import { get as getUsers } from './infra'

class UserQuery {
  async get(source, params, ctx) {
    const users = await getUsers(ctx)

    return users
  }

  async getById(source, params, ctx) {
    const { id } = params

    const user = await getUsers(ctx, { id, first: true })
    
    return user
  }
}

export default UserQuery