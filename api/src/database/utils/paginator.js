const KnexQueryBuilder = require('knex/lib/query/builder')

export default function (knex) {
  KnexQueryBuilder.prototype.paginate = function ({ rowsPerPage = 10, currentPage = 1, isLengthAware = false }) {
    // Object that will be returned
    let paginator = {}

    // Validate argument type
    if (isNaN(rowsPerPage)) {
      throw new Error('Paginator error: rowsPerPage must be a number.')
    }

    if (isNaN(currentPage)) {
      throw new Error('Paginator error: page must be an number.')
    }

    if (typeof isLengthAware != 'boolean') {
      throw new Error('Paginator error: isLengthAware must be a boolean.')
    }

    // Don't allow negative pages
    if (currentPage < 1) {
      currentPage = 1
    }

    const offset = (currentPage - 1) * rowsPerPage

    let promises = []

    // If the paginator is aware of its length, count the resulting rows
    if (isLengthAware) {
      promises.push(this.clone().clearSelect().clearOrder().count('* as total').first())
    } else {
      promises.push(new Promise((resolve, _) => resolve()))
    }

    // This will paginate the data itself
    promises.push(this.offset(offset).limit(rowsPerPage))

    return Promise.all(promises).then(([countQuery, result]) => {
      // If the paginator is length aware...
      if (isLengthAware) {
        const total = countQuery.total

        paginator = {
          ...paginator,
          total: Number(total),
          last_page: Math.ceil(total / rowsPerPage)
        }
      }

      // Add pagination data to paginator object
      paginator = {
        ...paginator,
        per_page: Number(rowsPerPage),
        current_page: Number(currentPage),
        from: offset,
        to: offset + result.length,
        data: result
      }

      return paginator
    })
  }

  knex.queryBuilder = function queryBuilder() {
    return new KnexQueryBuilder(knex.client)
  }
}