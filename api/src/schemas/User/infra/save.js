export default async (data, ctx) => {
  const { password, ...rest } = data

  const defaultRole = await ctx.db('roles')
    .select('id')
    .where('name', 'default_user')
    .first()

  const systemUser = await ctx.db('users')
    .select('id')
    .where('email', 'system@mail.com')
    .first()

  const { password: _, ...user } = await ctx.db('users')
    .insert({
      ...rest,
      role_id: defaultRole.id,
      password: await ctx.methods.hash(password),
      created_by: ctx.user ? ctx.user.id : systemUser.id
    })
    .returning('*')
    .then(data => data[0])
    .catch(err => {
      ctx.methods.errorHandling('Internal server error', 'user_save', err)
    })

  return user
}
