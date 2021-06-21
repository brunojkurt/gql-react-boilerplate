export default async (ctx, { role_id: roleId }) => {
  const query = ctx.db('role_permissions')
    .select('permissions.code')
    .join('permissions', 'role_permissions.permission_id', 'permissions.id')
    .where('role_id', roleId)

  const permissions = await query.then(data => data || [])
    .catch(err => {
      ctx.methods.errorHandling('Internal server error', 'user_get_permissions', err)
    })

  return permissions.map(permissions => permissions.code)
}
