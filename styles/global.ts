import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  html,
  body {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
      Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    line-height: 1.6;
    font-size: 18px;
  }
  * {
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
