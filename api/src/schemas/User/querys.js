class UserQuery {
  async get(source, params, ctx) {
    const users = await ctx.db('users')
      .then(data => data)
      .catch(err => {
        ctx.errorHandling('Internal server error', 'user_get', err)
      })
    return users
  }

  async getById(source, params, ctx) {
    const { id } = params

    const user = await ctx.db('users')
      .where('id', id)
      .then(data => data[0])
      .catch(err => {
        ctx.errorHandling('Internal server error', 'user_get_by_id', err)
      })

    return user
  }
}

export default UserQuery