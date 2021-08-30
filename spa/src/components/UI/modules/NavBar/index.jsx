import React from 'react'
import { useHistory } from 'react-router-dom'

import { Bar, Button, Toolbar, Typography } from 'components/UI/elements'
import { useAuth } from 'hooks/auth'
import { BarContent } from './styles'

const NavBar = (props) => {
  const { title, ...rest } = props
  const history = useHistory()
  const { user } = useAuth()

  return (
    <>
      <Bar {...rest}>
        <BarContent>
          <div>
            {title && (
              <Typography
                color='primary'
                variant='h6'
              >
                {title}
              </Typography>
            )}
          </div>
          {user?.name
            ? (
              <Button
                color='primary'
                onClick={() => history.push('/dashboard')}
              >
                {user.name}
              </Button>
              )
            : (
              <Button
                color='primary'
                onClick={() => history.push('/login')}
              >
                Login
              </Button>
              )}
        </BarContent>
      </Bar>
      {(!props.position || props.position === 'absolute' || props.position === 'fixed') && (
        <Toolbar />
      )}
    </>
  )
}

export default NavBar
