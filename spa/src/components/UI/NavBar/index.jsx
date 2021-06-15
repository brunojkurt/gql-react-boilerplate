import React from 'react'
import { Typography, Toolbar, Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

import { Bar } from '..'
import { useAuth } from '../../../hooks/auth'
import { Toolbar as StyledToolbar } from './styles'

const NavBar = (props) => {
  const { title, ...rest } = props
  const history = useHistory()
  const { user } = useAuth()

  return (
    <>
      <Bar { ...rest }>
        <StyledToolbar>
          <div>
            { title && (
              <Typography
                color="primary"
                variant="h6">
                { title }
              </Typography>
            ) }
          </div>
          { user?.name ? (
            <Button
              onClick={ () => history.push('/dashboard') }>
              { user.name }
            </Button>
          ) : (
            <Button
              onClick={ () => history.push('/login') }>
              Login
            </Button>
          )}
        </StyledToolbar>
      </Bar>
      { (!props.position || props.position === 'absolute' || props.position === 'fixed') && (
          <Toolbar/>
      ) }
    </>
  )
}

export default NavBar