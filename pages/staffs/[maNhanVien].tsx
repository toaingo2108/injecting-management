import {
  Box,
  CardContent,
  Divider,
  Grid,
  Paper,
  Typography,
} from '@mui/material'
import { GetServerSideProps, NextPage } from 'next'
import Layout from '~/components/layout'
import MyAvatar from '~/components/myAvatar'
import { NhanVien } from '~/model'
import { apiUrl } from '~/src/constants'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const maNhanVien = ctx.params?.maNhanVien
  const res = await fetch(`${apiUrl}/nhan-vien/${maNhanVien}`)
  const data = await res.json()
  if (!data) {
    return {
      notFound: true,
    }
  }
  const nhanVien: NhanVien = data.nhanVien
  return { props: { nhanVien } }
}

interface Props {
  nhanVien: NhanVien
}

const StaffDetail: NextPage<Props> = ({ nhanVien }) => {
  return (
    <Layout title={`Thông tin chi tiết nhân viên ${nhanVien.MaNhanVien}`}>
      <Grid container spacing={4}>
        <Grid item xs={3} container justifyContent="center">
          <MyAvatar
            name={nhanVien.TenNhanVien}
            sx={{
              width: '100%',
              height: 0,
              fontSize: 100,
              padding: '50%',
            }}
          />
        </Grid>
        <Grid item xs={8}>
          <Paper elevation={2} sx={{ borderRadius: 5 }}>
            <CardContent>
              <Box>
                <Typography gutterBottom variant="h2" component="div">
                  {nhanVien.TenNhanVien}
                </Typography>
                <Typography variant="h4" color="text.secondary">
                  Bằng cấp: {nhanVien.BangCap}
                </Typography>
                <Typography variant="h4" color="text.secondary">
                  Bằng cấp: {nhanVien.ChucVu}
                </Typography>

                <Divider sx={{ my: 4 }} />
                <Typography variant="h5" color="text">
                  Liên hệ: {nhanVien.SoDienThoai}
                </Typography>
                <Typography variant="h5" color="text" mt={2}>
                  Email : {nhanVien.Email}
                </Typography>
              </Box>
            </CardContent>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default StaffDetail
