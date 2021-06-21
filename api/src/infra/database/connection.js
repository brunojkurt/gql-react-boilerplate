import { attachPaginate } from './extensions'
const Knex = require('knex')
const knexConfig = require('../../../knexfile')

attachPaginate(Knex)

const connection = Knex(knexConfig)

export default connection
