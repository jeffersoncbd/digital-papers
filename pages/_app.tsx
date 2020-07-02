import { useEffect } from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import Router from 'next/router'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import api from '../services/api'

import Container from '../components/Container'
import Navbar from '../components/Navbar'

import GlobalStyles from '../styles/global'

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      if (!api.defaults.headers.Authorization && pageProps.public) {
        api.defaults.headers.Authorization = `Bearer ${token}`
        Router.push('/inbox')
      }
    }
  }, [])

  return (
    <>
      <GlobalStyles />
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      {pageProps.public ? (
        <Component {...pageProps} />
      ) : (
        <>
          <Navbar />
          <Container>
            <Component {...pageProps} />
          </Container>
        </>
      )}

      <ToastContainer autoClose={2500} />
    </>
  )
}

export default App
