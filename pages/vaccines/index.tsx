import { GetServerSideProps, NextPage } from 'next'
import { Grid, Paper } from '@mui/material'
import Layout from '~/components/layout'
import VaccineItem from '~/components/vaccineItem'
import Cart from '~/components/cart'
import { VacXin } from '~/model'
import { v4 as uuidv4 } from 'uuid'
import { apiUrl } from '~/src/constants'

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${apiUrl}/vac-xin`)
  const data = await res.json()
  const dsVacXin: VacXin[] = data.dsVacXin
  return { props: { dsVacXin } }
}

interface Props {
  dsVacXin: VacXin[]
}

const Vaccines: NextPage<Props> = ({ dsVacXin }) => {
  return (
    <Layout title="Tra cứu vắc xin" titlePage="Thông tin sản phẩm vắc xin">
      <Grid container spacing={6}>
        <Grid
          item
          xs={12}
          lg={8}
          container
          spacing={2}
          alignContent="flex-start"
        >
          {dsVacXin.map((vaccine) => (
            <Grid key={uuidv4()} item xs={12} md={6} lg={4}>
              <Paper elevation={24} sx={{ borderRadius: 5 }}>
                <VaccineItem vaccine={vaccine} action />
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Grid item xs={12} lg={4} container alignItems="flex-start">
          <Grid item xs={12}>
            <Paper elevation={24} sx={{ borderRadius: 5 }}>
              <Cart />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Vaccines
