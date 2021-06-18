export default async (id, options = {}, ctx) => {
  const query = ctx.db('users')
    .where('id', id)

  if (options.hard) {
    query.del()
  } else {
    query.update({
      deleted_at: ctx.db.fn.now()
    })
  }

  const result = await query.then(() => true)
    .catch(err => {
      ctx.methods.errorHandling('Internal server error', 'user_remove', err)
    })

  return result
}
