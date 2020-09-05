import styled, { createGlobalStyle } from 'styled-components'

export const ScrollContainer = styled.div`
  height: 100vh;
`

export default createGlobalStyle`
  html,
  body, #__next {
    line-height: 1.6;
    font-size: 18px;
    height: 100vh;
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
