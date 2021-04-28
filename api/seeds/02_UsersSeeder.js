const bcrypt = require('bcryptjs')
const { promisify } = require('util')

const { systemUUID } = require('./utils/constants')

const AsyncHash = promisify(bcrypt.hash)

exports.seed = async function(knex) {
  const haveUsers = await knex('users')
  .then(data => {
    if (data && data.length > 0) {
      return true
    }
    return false
  })

  if (haveUsers) return false;

  const systemRole = await knex('roles')
    .where('name', 'system')
    .first()

  const adminRole = await knex('roles')
    .where('name', 'administrator')
    .first()

  return await knex('users').insert([
    { 
      id: systemUUID(),
      name: 'System',
      email: process.env.SYSTEM_EMAIL || 'system@mail.com',
      password: await AsyncHash(String(Date.now() * Date.now()), 12),
      role_id: systemRole.id,
      created_by: systemUUID()
    },
    {
      name: 'Administrator',
      email: process.env.ADMINISTRATOR_EMAIL || 'admin@mail.com',
      password: await AsyncHash('Admin@P4ssw0rd', 12),
      role_id: adminRole.id,
      created_by: systemUUID()
    }
  ]);
};
