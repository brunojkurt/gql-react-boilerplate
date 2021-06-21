import React, { useState, useEffect } from 'react'
import { TextField, Typography } from '@material-ui/core'
import { Container, LogoWrapper, Logo, FormPaper, FormItem, ButtonWrapper } from './styles'
import { Button } from '../../UI'
import { useApolloClient } from '../../../hooks/apollo'
import { UserAuthenticate } from '../../../gql'
import { useAuth } from '../../../hooks/auth'

const Login = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const client = useApolloClient()
  const { login, token } = useAuth()

  useEffect(() => {
    const checkAuth = () => {
      if (token) {
        history.push('/dashboard')
      }
    }

    checkAuth()
  }, [token, history])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    await client.mutate({
      mutation: UserAuthenticate,
      variables: {
        email,
        password
      }
    })
      .then(async response => {
        const { data } = response
        const { UserAuthenticate: authData } = data
        await login(authData.user, authData.token)
      })
      .catch(error => {
        window.alert(error.message)
      })

    setLoading(false)
  }

  return (
    <Container maxWidth='xs'>
      <FormPaper elevation={3}>
        <LogoWrapper>
          <Typography
            color='primary'
            variant='h4'
          >
            <Logo />
          </Typography>
          <Typography
            color='primary'
            variant='h4'
          >
            LOGIN
          </Typography>
        </LogoWrapper>
        <form onSubmit={(e) => handleSubmit(e)}>
          <FormItem>
            <TextField
              id='email'
              label='E-mail'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
            />
          </FormItem>

          <FormItem>
            <TextField
              id='password'
              label='Senha'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
            />
          </FormItem>

          <ButtonWrapper>
            <Button
              color='primary'
              type='submit'
              variant='contained'
              loading={loading}
              disabled={loading}
              fullWidth
            >
              Entrar
            </Button>
          </ButtonWrapper>
        </form>
      </FormPaper>
    </Container>
  )
}

export default Login
