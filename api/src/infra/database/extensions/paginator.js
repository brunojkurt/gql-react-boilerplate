export default function attachPaginate(Knex) {
  function paginate({ rowsPerPage = 10, currentPage = 1, isFromStart = false, isLengthAware = false }) {
    if (isNaN(rowsPerPage)) {
      throw new Error('Paginate error: rowsPerPage must be a number.')
    }

    if (isNaN(currentPage)) {
      throw new Error('Paginate error: currentPage must be a number.')
    }

    if (typeof isFromStart !== 'boolean') {
      throw new Error('Paginate error: isFromStart must be a boolean.')
    }

    if (typeof isLengthAware !== 'boolean') {
      throw new Error('Paginate error: isLengthAware must be a boolean.')
    }

    const shouldFetchTotals = isLengthAware || currentPage === 1 || isFromStart
    let pagination = {}
    let countQuery = null

    if (currentPage < 1) {
      currentPage = 1
    }

    const offset = isFromStart ? 0 : (currentPage - 1) * rowsPerPage
    const limit = isFromStart ? rowsPerPage * currentPage : rowsPerPage

    const postProcessResponse =
      typeof this.client.config.postProcessResponse === 'function'
        ? this.client.config.postProcessResponse
        : function (key) {
            return key
          }

    if (shouldFetchTotals) {
      countQuery = new this.constructor(this.client)
        .count('* as total')
        .from(this.clone().offset(0).clearOrder().as('count__query__'))
        .first()
        .debug(this._debug)
    }

    // This will paginate the data itself
    this.offset(offset).limit(limit)

    return this.client.transaction(async (trx) => {
      const result = await this.transacting(trx)

      if (shouldFetchTotals) {
        const countResult = await countQuery.transacting(trx)
        const total = +(countResult.TOTAL || countResult.total)

        pagination = {
          total,
          lastPage: Math.ceil(total / rowsPerPage),
        }
      }

      // Add pagination data to paginator object
      pagination = postProcessResponse({
        ...pagination,
        rowsPerPage,
        currentPage,
        from: offset,
        to: offset + result.length,
      })

      return { data: result, ...pagination }
    })
  }

  Knex.QueryBuilder.extend('paginate', paginate)
}