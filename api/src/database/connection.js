const Knex = require('knex')
const knexConfig = require('../../knexfile')
import setupPaginate from './utils/paginator'

setupPaginate(Knex)

const connection = Knex(knexConfig)

export default connection