import { Grid, Typography } from '@mui/material'
import type { NextPage } from 'next'
import Layout from '~/components/layout'

const Home: NextPage = () => {
  return (
    <Layout title="Hệ thống tiêm chủng An Bình">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: '720px' }}
      >
        <Typography variant="h2" fontFamily="cursive">
          Holle .
        </Typography>
      </Grid>
    </Layout>
  )
}

export default Home
