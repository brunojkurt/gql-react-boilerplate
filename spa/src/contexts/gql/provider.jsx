import React from 'react'
import GQLContext from './context'
import * as queries from 'gql/queries'
import * as mutations from 'gql/mutations'

const GQLProvider = ({ children }) => {

  const contextValue = {
    queries,
    mutations
  }

  return (
    <GQLContext.Provider value={contextValue}>
      {children}
    </GQLContext.Provider>
  )
}

export default GQLProvider
