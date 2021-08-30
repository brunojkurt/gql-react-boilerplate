import React from 'react'

import GQLContext from './context'

const GQLProvider = ({ children }) => {

  return (
    <GQLContext.Provider>
      {children}
    </GQLContext.Provider>
  )
}

export default GQLProvider
