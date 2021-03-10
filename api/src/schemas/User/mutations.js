import jwt from 'jsonwebtoken'
import hash, { compare } from '../../utils/hash'

class UserMutation {
  async register(source, params, ctx) {
    const { userData } = params
    const { name, email, password } = userData

    const user = await ctx.db('users')
      .returning(['id, name, email'])
      .insert({
        name,
        email,
        password: await hash(password)
      })
      .then(data => data[0])
      .catch(err => {
        ctx.errorHandling('Internal server error', 'user_register', err)
      })

    const secret = `${process.env.TOKEN_SECRET}`

    if (!secret) {
      ctx.errorHandling('No token secret provided', 'user_register')
    }

    const token = jwt.sign(user, secret)

    return { user, token }
  }

  async authenticate(source, params, ctx) {
    const { email, password } = params
    
    const user = await ctx.db('users')
      .select('*')
      .where('email', email)
      .first()

    if (!user) {
      ctx.errorHandling('The provided e-mail was not found in the records.', 'user_authenticate')
    }

    const validatePassword = await compare(password, user.password)

    if (!validatePassword) {
      ctx.errorHandling('Invalid password.', 'user_authenticate')
    }

    const secret = `${process.env.TOKEN_SECRET}`

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email
    }
    
    const token = jwt.sign(userData, secret)

    return { user: userData, token }
  }

  async create(source, params, ctx) {
    const { name, email, password } = params

    const user = await ctx.db('users')
      .returning(['id', 'name', 'email'])
      .insert({
        name,
        email,
        password: await hash(password)
      })
      .then(data => data[0])
      .catch(err => {
        ctx.errorHandling('Internal server error', 'user_create', err)
      })
    
    return user
  }

  async update(source, params, ctx) {
    const { id, userData } = params

    const user = await ctx.db('users')
      .returning(['id', 'name', 'email'])
      .update(userData)
      .where('id', id)
      .then(data => data[0])
      .catch(err => {
        ctx.errorHandling('Internal server error', 'user_update', err)
      })
    
    return user
  }

  async delete(source, params, ctx) {
    const { id } = params

    await ctx.db('users')
      .where('id', id)
      .del()
      .then(() => true)
      .catch(err => {
        ctx.errorHandling('Internal server error', 'user_update', err)
      })
  }
}

export default UserMutation