const Knex = require('knex')
const knexConfig = require('../../../knexfile')
import { attachPaginate } from './extensions'

attachPaginate(Knex)

const connection = Knex(knexConfig)

export default connection