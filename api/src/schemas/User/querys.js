import { get as getUsers } from './infra'

class UserQuery {
  async get(source, params, ctx) {
    ctx.methods.hasPermission('user_get', ctx.user)

    const users = await getUsers(ctx, params)

    return users
  }
}

export default UserQuery