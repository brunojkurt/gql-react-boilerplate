const { onUpdate } = require('./triggers')

exports.up = function(knex) {
  return knex.schema.createTable('role_permissions', table => {
    table.uuid('role_id').notNullable()
      .references('roles.id');
    table.uuid('permission_id').notNullable()
      .references('permissions.id');
    table.timestamp('created_at').notNullable()
      .defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable()
      .defaultTo(knex.fn.now());
    table.timestamp('deleted_at');
    table.uuid('created_by').notNullable();
    table.uuid('updated_by');
    table.primary(['role_id', 'permission_id']);
  }).then(() => knex.raw(onUpdate('role_permissions')));
};

exports.down = function(knex) {
  return knex.schema.dropTable('role_permissions');
};
