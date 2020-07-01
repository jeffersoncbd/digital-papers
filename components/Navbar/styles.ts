import styled from 'styled-components'

export const Container = styled.nav`
  background: #202020;
  padding: 8px 0;
`

export const Content = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    color: #fff;
    font-weight: 300;
    font-size: 2rem;
  }
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    svg {
      margin: 0 8px;
      border-radius: 8%;
      cursor: pointer;
      &:hover {
        background: #444;
      }
    }
  }
`
