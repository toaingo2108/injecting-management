import { ReactNode } from 'react'
import Head from 'next/head'

import Appbar from '~/components/appbar'
import Footer from '~/components/footer'

import { Container } from '@mui/material'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Appbar />
      <Container sx={{ mt: 4 }} maxWidth="xl">
        {children}
      </Container>
      <Footer />
    </>
  )
}

export default Layout
