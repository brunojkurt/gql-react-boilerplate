export const paginateType = (typeName, dataType) => `
  type ${typeName} {
    total: Int
    lastPage: Int
    rowsPerPage: Int
    currentPage: Int
    from: Int
    to: Int
    data: [${dataType}]
  }
`
export const paginateParams = `
  input PaginateParams {
    currentPage: Int!
    rowsPerPage: Int!
    isLengthAware: Boolean
    isFromStart: Boolean
  }
`
