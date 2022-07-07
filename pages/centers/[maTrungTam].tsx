import { GetServerSideProps, NextPage } from 'next'
import { Grid, Paper, Typography } from '@mui/material'
import Layout from '~/components/layout'
import VaccineItem from '~/components/vaccineItem'
import { NhanVien, TrungTam, VacXin } from '~/model'
import { apiUrl } from '~/src/constants'
import TrungTamItem from '~/components/trungTamItem'
import { v4 as uuidv4 } from 'uuid'
import NhanVienItem from '~/components/nhanVienItem'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const maTrungTam = ctx.params?.maTrungTam
    const res = await fetch(`${apiUrl}/trung-tam/${maTrungTam}`)
    const data = await res.json()
    if (!data) {
      return {
        notFound: true,
      }
    }
    const trungTam: TrungTam = data.trungTam

    const dataDsVacXin = await fetch(
      `${apiUrl}/vac-xin/trung-tam/${trungTam.MaTrungTam}`
    ).then((data) => data.json())
    const dsVacXin: VacXin[] = dataDsVacXin.dsVacXin

    const dataNhanVien = await fetch(
      `${apiUrl}/nhan-vien/trung-tam/${trungTam.MaTrungTam}`
    ).then((data) => data.json())
    const dsNhanVien: NhanVien[] = dataNhanVien.dsNhanVien

    return { props: { trungTam, dsVacXin, dsNhanVien } }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}

interface Props {
  trungTam: TrungTam
  dsVacXin: VacXin[]
  dsNhanVien: NhanVien[]
}

const TrungTamDetail: NextPage<Props> = ({
  trungTam,
  dsVacXin,
  dsNhanVien,
}) => {
  return (
    <Layout
      title={`Thông tin chi tiết trung tâm ${trungTam.MaTrungTam}`}
      titlePage={`Thông tin chi tiết trung tâm ${trungTam.MaTrungTam}`}
    >
      <Grid container spacing={4}>
        <Grid item xs={3}>
          <Paper elevation={24} sx={{ borderRadius: 5 }}>
            <TrungTamItem trungTam={trungTam} />
          </Paper>
        </Grid>
        <Grid item container xs={8}>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              textTransform="uppercase"
              color="primary"
              mb={2}
            >
              Danh sách vắc xin
            </Typography>
          </Grid>
          <Grid item container xs={12} spacing={2}>
            {dsVacXin.map((vaccine) => (
              <Grid key={uuidv4()} item xs={12} md={6} lg={4}>
                <Paper elevation={12} sx={{ borderRadius: 5 }}>
                  <VaccineItem vaccine={vaccine} action />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              textTransform="uppercase"
              color="primary"
              mb={2}
            >
              Danh sách nhân viên
            </Typography>
          </Grid>
          <Grid item container xs={12} spacing={2}>
            {dsNhanVien.map((item) => (
              <Grid key={uuidv4()} item xs={12} md={6} lg={3}>
                <Paper elevation={12} sx={{ borderRadius: 5 }}>
                  <NhanVienItem nhanVien={item} />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default TrungTamDetail
