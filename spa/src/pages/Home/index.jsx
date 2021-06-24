import React from 'react'
import { NavBar, Grid, Box } from 'components/UI'

import { HomeContainer, Image, Rotate, HomeTitle } from './styles'
import { useI18n } from 'hooks/i18n'

const Home = () => {
  const { t } = useI18n()

  return (
    <>
      <NavBar
        title='GQL-BOILERPLATE'
      />
      <HomeContainer>
        <Grid container>
          <Grid item xs={6}>
            <Rotate>
              <Box display='flex' justifyContent='center'>
                <Image src='/graphql.svg' />
              </Box>
            </Rotate>
          </Grid>
          <Grid item xs={6}>
            <Rotate>
              <Box display='flex' justifyContent='center'>
                <Image src='/react.png' />
              </Box>
            </Rotate>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <HomeTitle
            variant='h2'
            align='center'
            color='primary'
          >
            {t('pages.home.welcome')}
          </HomeTitle>
        </Grid>
      </HomeContainer>
    </>
  )
}

export default Home
