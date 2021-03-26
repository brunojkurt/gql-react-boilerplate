export default async (id, data, ctx) => {
  const { password, ...rest } = data

  const user = await ctx.db('users')
    .returning(['id', 'name', 'email'])
    .update(password ? { password: await ctx.methods.hash(password), ...rest } : { ...rest })
    .where('id', id)
    .then(data => data[0])
    .catch(err => {
      ctx.methods.errorHandling('Internal server error', 'user_update', err)
    })

  return user
}