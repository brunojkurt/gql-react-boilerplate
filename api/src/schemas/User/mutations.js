import { save, update, remove, get, getUserPermissions } from './infra'

class UserMutation {
  async register(source, params, ctx) {
    const { userData } = params
    
    const user = await save(userData, ctx)

    const permissions = await getUserPermissions(user.role_id)

    const token = ctx.methods.signToken({ 
      id: user.id,
      name: user.name,
      email: user.email,  
      permissions
    })

    return { user, token }
  }

  async authenticate(source, params, ctx) {
    const { email, password } = params

    const user = await get(ctx, { email, first: true })

    if (!user) {
      ctx.methods.errorHandling('The provided e-mail was not found in the records.', 'user_authenticate')
    }

    const validatePassword = await ctx.methods.hashCompare(password, user.password)

    if (!validatePassword) {
      ctx.methods.errorHandling('Invalid password.', 'user_authenticate')
    }

    const permissions = await getUserPermissions(user.role_id)

    const token = ctx.methods.signToken({ 
      id: user.id,
      name: user.name,
      email: user.email,  
      permissions
    })

    return { user, token }
  }

  async create(source, params, ctx) {
    const { userData } = params

    const user = await save(userData, ctx)
    
    return user
  }

  async update(source, params, ctx) {
    const { id, userData } = params

    const user = await update(id, userData, ctx)

    return user
  }

  async delete(source, params, ctx) {
    const { id } = params

    const del = await remove(id, ctx)
    
    return del
  }
}

export default UserMutation