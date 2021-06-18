const { systemUUID } = require('./utils/constants')

exports.seed = async function (knex) {
  const havePermissions = await knex('roles')
    .then(data => {
      if (data && data.length > 0) {
        return true
      }
      return false
    })

  if (havePermissions) return false

  const rolePermissions = {
    system: [
      'user_get',
      'user_create',
      'user_update',
      'user_delete'
    ],
    administrator: [
      'user_get',
      'user_create',
      'user_update',
      'user_delete'
    ],
    default_user: [

    ]
  }

  const insertRoles = async () => {
    return await knex('roles').insert([
      { name: 'system', created_by: systemUUID() },
      { name: 'administrator', created_by: systemUUID() },
      { name: 'default_user', created_by: systemUUID() }
    ]).returning(['id', 'name'])
  }

  const insertPermissions = async () => {
    return await knex('permissions').insert([
      {
        code: 'user_get',
        description: 'Fetch Users data',
        created_by: systemUUID()
      },
      {
        code: 'user_create',
        description: 'Create new User',
        created_by: systemUUID()
      },
      {
        code: 'user_update',
        description: 'Update User data',
        created_by: systemUUID()
      },
      {
        code: 'user_delete',
        description: 'Update User data',
        created_by: systemUUID()
      }
    ]).returning(['id', 'code'])
  }

  const roles = await insertRoles()
  const permissions = await insertPermissions()

  let RolePermissionEntries = []

  roles.forEach(role => {
    const newPermissionEntries = rolePermissions[role.name].map(rolePermissions => ({
      role_id: role.id,
      permission_id: permissions.filter(permission => permission.code === rolePermissions)[0].id,
      created_by: systemUUID()
    }))
    RolePermissionEntries = [...RolePermissionEntries, ...newPermissionEntries]
  })

  return await knex('role_permissions')
    .insert(RolePermissionEntries)
}
