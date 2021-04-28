export default async (ctx, filters = {}) => {
  const query = ctx.db('users')
    .where(builder => {
      filters.id && builder.where('id', filters.id)
      filters.email && builder.where('email', filters.email)
    })
    .where(builder => {
      !filters.withTrashed && builder.whereNull('deleted_at')
      filters.onlyTrashed && builder.whereNotNull('deleted_at')
    })

  const users = await query.then(data => {
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