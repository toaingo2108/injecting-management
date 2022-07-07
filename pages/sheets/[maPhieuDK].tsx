import { Grid, Paper, Typography } from '@mui/material'
import { GetServerSideProps, NextPage } from 'next'
import KhachHangItem from '~/components/khachHangItem'
import Layout from '~/components/layout'
import PhieuDKTiemItem from '~/components/phieuDKTiemItem'
import { KhachHang, PhieuDKTiem } from '~/model'
import { apiUrl } from '~/src/constants'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const maPhieuDK = ctx.params?.maPhieuDK
  const res = await fetch(`${apiUrl}/phieu-dk-tiem/${maPhieuDK}`)
  const data = await res.json()
  if (!data) {
    return {
      notFound: true,
    }
  }
  const phieuDKTiem: PhieuDKTiem = data.phieuDKTiem

  const dataKhachHang = await fetch(
    `${apiUrl}/khach-hang/${phieuDKTiem.MaKhachHang}`
  ).then((data) => data.json())
  const khachHang: KhachHang = dataKhachHang.khachHang

  return { props: { phieuDKTiem, khachHang } }
}

interface Props {
  phieuDKTiem: PhieuDKTiem
  khachHang: KhachHang
}
const SheetDetail: NextPage<Props> = ({ phieuDKTiem, khachHang }) => {
  console.log(khachHang)
  return (
    <Layout
      title="Thông tin phiếu đăng ký tiêm"
      titlePage={`Thông tin chi tiết phiếu đăng ký tiêm - Mã [${phieuDKTiem.MaPhieuDK}]`}
    >
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
              <PhieuDKTiemItem phieuDKTiem={phieuDKTiem} detail />
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" textTransform="uppercase" color="primary">
            Thông tin khách hàng của phiếu: {phieuDKTiem.MaPhieuDK}
          </Typography>
          <Grid item xs={3} mt={4}>
            <Paper elevation={6} sx={{ borderRadius: 5 }}>
              <KhachHangItem khachHang={khachHang} />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default SheetDetail
