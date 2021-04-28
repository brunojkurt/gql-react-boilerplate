export default async (id, ctx) => {
  return await ctx.db('users')
    .where('id', id)
    .del()
    .then(() => true)
    .catch(err => {
      ctx.methods.errorHandling('Internal server error', 'user_remove', err)
    })
}