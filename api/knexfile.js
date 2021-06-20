const path = require('path')

//npx knex migrate:latest --knexfile knexfile.ts migrate:latest
//npx knex migrate:rollback --knexfile knexfile.ts migrate:rollback

const use = process.env.DB_DRIVER || 'pg'

const connections = {
  pg: {
    client: 'pg',

    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || '',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'postgres_db'
    },

    migrations: {
      directory: path.resolve(__dirname, 'migrations')
    },

    seeds: {
      directory: path.resolve(__dirname, 'seeds')
    },

    debug: process.env.DB_DEBUG || false
  }
}

module.exports = connections[use]