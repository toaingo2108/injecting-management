import { useState } from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '~/src/theme'
import { Router } from 'next/router'
import Loader from '~/components/loader'

// Client-side cache, shared for the whole session of the user in the browser.

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props
  const [loading, setLoading] = useState(false)

  Router.events.on('routeChangeStart', () => {
    setLoading(true)
  })

  Router.events.on('routeChangeComplete', () => {
    setLoading(false)
  })

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <div style={{ position: 'relative' }}>
          {loading && <Loader />}
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </>
  )
}
