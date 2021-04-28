const { onUpdate } = require('./triggers')

exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.uuid('id').unique().primary().notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('name').notNullable();
    table.string('email', 254).notNullable().unique();
    table.string('password', 60).notNullable();
    table.uuid('role_id').notNullable()
      .references('roles.id');
    table.timestamp('created_at').notNullable()
      .defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable()
      .defaultTo(knex.fn.now());
    table.timestamp('deleted_at')
    table.uuid('created_by').notNullable()
    table.uuid('updated_by')
  }).then(() => knex.raw(onUpdate('users')));
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
