import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    align-items: center;
    width: 500px;

    input {
      text-align: center;
      margin-right: 5px;
    }
  }
`

export const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 60px;

  h1 {
    font-weight: 300;
  }

  p {
    color: #555;
  }
`
