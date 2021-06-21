import React from 'react'
import { Backdrop as BackdropBase, CircularProgress } from '@material-ui/core'

const Backdrop = () => {
  return (
    <BackdropBase open>
      <CircularProgress color='inherit' />
    </BackdropBase>
  )
}

export default Backdrop
