import { useEffect, useState, FormEvent } from 'react'
import { toast } from 'react-toastify'
import Head from 'next/head'
import Router from 'next/router'
import { GetStaticProps } from 'next'

import api from '../services/api'

import { Container, WelcomeContainer } from '../styles/pages/home'

import Input from '../components/Input'
import Button from '../components/Button'

interface Configured {
  done: boolean
  hash?: string
}

export const getStaticProps: GetStaticProps = () => {
  return { props: { public: true } }
}

export default function Home() {
  const [configured, setConfiguration] = useState<Configured>({ done: true })
  const [password, setPassword] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      const response = await api.post('/login', { password }, {})
      const { feedback, token } = response.data
      toast.success(feedback)
      localStorage.setItem('token', token)
      api.defaults.headers.Authorization = `Bearer ${token}`
      Router.push('/inbox')
    } catch (error) {
      toast.error(error.response.data.feedback)
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
          Aplicar o método <a href="https://gettingthingsdone.com/">GTD</a>{' '}
          nunca foi tão fácil!
        </p>
      </WelcomeContainer>

      {configured.done ? (
        <form onSubmit={handleSubmit}>
          <Input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button type="submit">Entrar</Button>
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
