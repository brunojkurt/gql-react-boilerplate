import jwt from 'jsonwebtoken'
import hash, { compare } from '../../utils/hash'

class UserMutation {
  async register(source, params, ctx) {
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

  }

  async delete(source, params, ctx) {
    
  }
}

export default UserMutation