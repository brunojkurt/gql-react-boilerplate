import { save, update, remove, get } from './infra'

class UserMutation {
  async register(source, params, ctx) {
    const { userData } = params
    
    const user = await save(userData, ctx)

    const secret = `${process.env.TOKEN_SECRET}`

    if (!secret) {
      ctx.methods.errorHandling('No token secret provided', 'user_register')
    }

    const token = ctx.jwt.sign(user, secret)

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

    const secret = `${process.env.TOKEN_SECRET}`

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email
    }
    
    const token = ctx.methods.jwt.sign(userData, secret)

    return { user: userData, token }
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