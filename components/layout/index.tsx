import { ReactNode } from 'react'
import Head from 'next/head'
import Navbar from '~/components/navbar'
// import Footer from '~/components/footer'
import { Container, Typography } from '@mui/material'

type Props = {
  children?: ReactNode
  title?: string
  titlePage?: string
}

const Layout = ({
  children,
  title = 'This is the default title',
  titlePage = '',
}: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar />
      <Container sx={{ mt: 4 }} maxWidth="xl">
        {titlePage && (
          <Typography gutterBottom variant="h5" component="div" mb={4}>
            {titlePage.toUpperCase()}
          </Typography>
        )}
        {children}
      </Container>
      {/* <Footer /> */}
    </>
  )
}

export default Layout
