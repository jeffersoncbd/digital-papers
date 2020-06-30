import { AppProps } from 'next/app'
import Head from 'next/head'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import GlobalStyles from '../styles/global'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
      <ToastContainer autoClose={2500} />
    </>
  )
}

export default App
