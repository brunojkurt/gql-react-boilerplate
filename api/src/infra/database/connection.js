const Knex = require('knex')
const knexConfig = require('../../../knexfile')
import { setupPaginator } from './utils'

setupPaginator(Knex)

const connection = Knex(knexConfig)

export default connection