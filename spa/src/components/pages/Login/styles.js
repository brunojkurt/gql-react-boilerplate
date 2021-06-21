import styled from 'styled-components'
import { Container as ContainerBase, Paper } from '@material-ui/core'
import { SiGooglesearchconsole } from 'react-icons/si'

export const Container = styled(ContainerBase)`
  height: 100vh;
  align-items: center;
  justify-content: center;
`
export const LogoWrapper = styled.div`
  width: 100%;
  justify-content: center;
  text-align: center;
`
export const Logo = styled(SiGooglesearchconsole)`
  font-size: 80px;
`
export const FormPaper = styled(Paper)`
  margin-top: 20vh;
  padding: 15px;
`
export const FormItem = styled.div`
  margin-bottom: 15px;
`
export const ButtonWrapper = styled.div`
  margin-top: 30px;
`
