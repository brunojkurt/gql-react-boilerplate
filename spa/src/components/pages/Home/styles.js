import styled from 'styled-components'
import { Container as ContainerBase, Typography } from '@material-ui/core'

export const Container = styled(ContainerBase)`
  padding-top: 5vh;
  height: 100%;
`
export const Image = styled.img`
  src: ${({ src }) => `url(${src})`};
  width: 90%;
  max-width: 400px;
  height: auto;
`
export const Rotate = styled.div`
  animation: rotation 8s infinite linear;
  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
`
export const Title = styled(Typography)`
  margin-top: 80px;
`