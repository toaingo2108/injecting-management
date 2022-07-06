import { Grid, Paper } from '@mui/material'
import { GetServerSideProps, NextPage } from 'next'
import Layout from '~/components/layout'
import PhieuDKTiemItem from '~/components/phieuDKTiemItem'
import { PhieuDKTiem } from '~/model'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const maPhieuDK = ctx.params?.maPhieuDK
  const res = await fetch(
    `http://localhost:5000/api/phieu-dk-tiem/${maPhieuDK}`
  )
  const data = await res.json()
  if (!data) {
    return {
      notFound: true,
    }
  }
  const phieuDKTiem: PhieuDKTiem = data.phieuDKTiem
  return { props: { phieuDKTiem } }
}

interface Props {
  phieuDKTiem: PhieuDKTiem
}
const SheetDetail: NextPage<Props> = ({ phieuDKTiem }) => {
  return (
    <Layout title="Thông tin phiếu đăng ký tiêm">
      <Grid container spacing={6}>
        <Grid
          item
          xs={12}
          lg={8}
          container
          spacing={2}
          alignContent="flex-start"
        >
          <Grid item xs={12} md={6} lg={4}>
            <Paper elevation={6} sx={{ borderRadius: 5 }}>
              <PhieuDKTiemItem phieuDKTiem={phieuDKTiem} />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default SheetDetail
