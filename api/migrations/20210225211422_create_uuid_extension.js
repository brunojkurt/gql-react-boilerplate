
exports.up = async function(knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
};

exports.down = function(knex) {
  knex.raw('drop extension if exists "uuid-ossp"');
};
