export default function (knex) {

  knex.QueryBuilder.extend('deleteSoftly', () => {
    return this.update('deleted_at', knex.fn.now())
  })

  knex.QueryBuilder.extend('notDeleted', () => {
    return this.whereNull('deleted_at')
  })

  knex.QueryBuilder.extend('withDeleted', () => {
    return this.whereNotNull('deleted_at')
  })

}