import React from 'react'
import { Grid, Box } from '@material-ui/core'
import { NavBar } from '../../UI'

import { Container, Image, Rotate, Title } from './styles'
import { useTheme } from '../../../hooks/theme'

const Home = () => {
  const { palette } = useTheme()

  return (
    <>
      <NavBar
        title="GQL-BOILERPLATE"
        background={palette.background.paper} />
      <Container>
        <Grid container>
          <Grid item xs={6}>
            <Rotate>
              <Box display="flex" justifyContent="center">
                <Image src="/graphql.svg" />
              </Box>
            </Rotate>
          </Grid>
          <Grid item xs={6}>
            <Rotate>
              <Box display="flex" justifyContent="center">
                <Image src="/react.png" />
              </Box>
            </Rotate>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Title variant="h2" align="center">
            GQL + React Boilerplate
          </Title>
        </Grid>
      </Container>
    </>
  )
}

export default Home