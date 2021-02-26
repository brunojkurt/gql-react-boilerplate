import { createGlobalStyle } from 'styled-components'
import { Roboto } from './fonts'

const GlobalStyle = createGlobalStyle`
  ${ Roboto }
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  html, body, #root {
    height: 100%;
  }
  body, input, button {
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 14px;
  }
`

export default GlobalStyle