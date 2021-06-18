export default async (ctx, { role_id }) => {
  const query = ctx.db('role_permissions')
    .select('permissions.code')
    .join('permissions', 'role_permissions.permission_id', 'permissions.id')
    .where('role_id', role_id)

  const permissions = await query.then(data => data || [])
    .catch(err => {
      ctx.methods.errorHandling('Internal server error', 'user_get_permissions', err)
    })

  return permissions.map(permissions => permissions.code)
}
