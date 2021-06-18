/* eslint-env jest */
import { gql } from 'apollo-server'
import { createTestClient } from 'apollo-server-testing'
import { makeApolloServer } from './helpers'

describe('UserRegister Mutation', () => {
  test('Should register a user with valid data', async () => {
    const { mutate } = createTestClient(makeApolloServer)
    const userRegister = gql`
      mutation UserRegister ($name: String!, $email: String!, $password: String!) {
        UserRegister (
          userData: {
            name: $name, 
            email: $email, 
            password: $password
          }
        ) {
            token
            user {
              name
            }
          }
        }
    `
    const registerResponse = await mutate({
      mutation: userRegister,
      variables: {
        name: 'Any Name',
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    })
    expect(registerResponse.data.UserRegister.token).toBeTruthy()
    expect(registerResponse.data.UserRegister.user.name).toBe('Any Name')
  })
})

describe('UserAuthenticate Mutation', () => {
  test('Should authenticate a user with correct credentials', async () => {
    const { mutate } = createTestClient(makeApolloServer)
    const userAuthenticate = gql`
    mutation UserAuthenticate ($email: String!, $password: String!) {
      UserAuthenticate (email: $email, password: $password) {
        token
        user {
          name
        }
      }
    }
    `
    const authenticationResponse = await mutate({
      mutation: userAuthenticate,
      variables: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    })
    expect(authenticationResponse.data.UserAuthenticate.token).toBeTruthy()
    expect(authenticationResponse.data.UserAuthenticate.user.name).toBe('Any Name')
  })
})
