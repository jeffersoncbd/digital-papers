import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  html,
  body {
    line-height: 1.6;
    font-size: 18px;
  }
  * {
    font-family: 'Roboto', sans-serif;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  a {
    color: #0070f3;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  img {
    max-width: 100%;
    display: block;
  }
`
