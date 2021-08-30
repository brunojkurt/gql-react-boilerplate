import styled from 'styled-components'
import { Container, Paper } from 'components/UI/elements'
import { SiGooglesearchconsole } from 'react-icons/si'

export const LoginContainer = styled(Container)`
  height: 100%;
  display: flex;
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
  width: 100%;
  max-width: 450px;
  padding: 15px;
`
export const FormItem = styled.div`
  margin-bottom: 15px;
`
export const ButtonWrapper = styled.div`
  margin-top: 30px;
`
