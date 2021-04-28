const Knex = require('knex')
const knexConfig = require('../../../knexfile')
import { setupPaginator, setupSoftDelete } from './utils'

setupPaginator(Knex)
setupSoftDelete(Knex)

const connection = Knex(knexConfig)

export default connection