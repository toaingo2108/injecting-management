import { NextPage } from 'next'
import { Grid, Paper } from '@mui/material'
import Layout from '~/components/layout'
import VaccineItem from '~/components/vaccineItem'
import CartVaccines from '~/components/cartVaccines'
import { vaccines } from '~/data'

const Order: NextPage = () => {
  return (
    <Layout title="Đặt mua vắc xin" titlePage="Thông tin sản phẩm vắc xin">
      <Grid container spacing={6}>
        <Grid
          item
          xs={12}
          lg={8}
          container
          spacing={2}
          alignContent="flex-start"
        >
          {vaccines.map((vaccine) => (
            <Grid key={vaccine.id} item xs={12} md={6} lg={4}>
              <Paper elevation={24} sx={{ borderRadius: 5 }}>
                <VaccineItem vaccine={vaccine} />
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Grid item xs={12} lg={4} container alignItems="flex-start">
          <Grid item xs={12}>
            <Paper elevation={24} sx={{ borderRadius: 5 }}>
              <CartVaccines />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Order
