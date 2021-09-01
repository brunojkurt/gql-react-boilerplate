import React, { useState, useEffect } from 'react'
import { Button, TextField, Typography } from 'components/UI/elements'
import {
  LoginContainer,
  LogoWrapper,
  Logo,
  FormPaper,
  FormItem,
  ButtonWrapper
} from './styles'
import { useAuth } from 'hooks/auth'
import { useGQL } from 'hooks/gql'

const Login = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { login, token } = useAuth()
  const { mutations } = useGQL()
  const { authenticate, loading } = mutations.user.useAuthenticate()

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

    await authenticate({
      variables: {
        email,
        password
      }
    })
      .then(async response => {
        console.log(response)
        const { data } = response
        const { UserAuthenticate: authData } = data
        await login(authData.user, authData.token)
      })
      .catch(error => {
        window.alert(error.message)
      })
  }

  return (
    <LoginContainer maxWidth='xs'>
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
    </LoginContainer>
  )
}

export default Login
