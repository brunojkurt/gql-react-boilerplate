export default async (data, ctx) => {
  const { password, ...rest } = data

  const user = await ctx.db('users')
    .returning(['id, name, email'])
    .insert({
      ...rest,
      password: await ctx.methods.hash(password)
    })
    .then(data => data[0])
    .catch(err => {
      ctx.methods.errorHandling('Internal server error', 'user_save', err)
    })

  return user
}