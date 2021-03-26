export default async (ctx, filters = {}) => {
  const query = await ctx.db('users')
    .where(builder => {
      if (filters.id) {
        builder.where('id', filters.id)
      }
      if (filters.email) {
        builder.where('email', filters.email)
      }
    })

  const users = query.then(data => {
    if (filters.first) {
      return !!data.length ? data[0] : null
    }
    return data
  })
  .catch(err => {
    ctx.methods.errorHandling('Internal server error', 'user_get', err)
  })

  return users
}