import { useEffect, useState, FormEvent } from 'react'
import Head from 'next/head'

import api from '../services/api'

import { Container, WelcomeContainer } from '../styles/pages/home'

interface Configured {
  done: boolean
  hash?: string
}

export default function Home() {
  const [configured, setConfiguration] = useState<Configured>({ done: true })
  const [password, setPassword] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      const response = await api.post('/login', { password }, {})
      console.log(response.data)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  useEffect(() => {
    api.get<Configured>('/verify-configuration').then((response) => {
      setConfiguration(response.data)
    })
  }, [])

  return (
    <Container>
      <Head>
        <title>Digital Papers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <WelcomeContainer>
        <h1>Bem vindo ao Digital Papers</h1>
        <p>
          Aplicar o método <a href="https://gettingthingsdone.com/">GTD</a> na
          sua vida nunca foi tão fácil!
        </p>
      </WelcomeContainer>

      {configured.done ? (
        <form onSubmit={handleSubmit}>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="submit">Entrar</button>
        </form>
      ) : (
        <>
          <p>
            Guarde o hash abaixo, você vai precisar para acessar a aplicação.
          </p>
          <h3>{configured.hash}</h3>
        </>
      )}
    </Container>
  )
}
