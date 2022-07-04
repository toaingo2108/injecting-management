import { GetServerSideProps, NextPage } from 'next'
import { Grid, Paper, Typography } from '@mui/material'
import Layout from '~/components/layout'
import VaccineItem from '~/components/vaccineItem'
import { vaccines } from '~/data'
import { Vaccine } from '~/model'
import Image from 'next/image'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const maVacXin = ctx.params?.maVacXin

  // const res = await fetch(`https://localhost:3000/api/`)
  // const data = await res.json()

  if (!maVacXin) {
    return {
      notFound: true,
    }
  }

  return {
    props: { vacXin: vaccines[0] }, // will be passed to the page component as props
  }
}

interface Props {
  vacXin: Vaccine
}

const VaccineDetail: NextPage<Props> = ({ vacXin }) => {
  return (
    <Layout title="Thông tin vắc xin">
      <Grid container spacing={4}>
        <Grid item xs={3}>
          <Paper elevation={24} sx={{ borderRadius: 5 }}>
            <VaccineItem vaccine={vacXin} action />
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h6" textTransform="uppercase" color="primary">
            MÔ TẢ THÔNG TIN VẮC XIN: {vacXin.name}
          </Typography>
          <Typography variant="body2" my={2}>
            Phòng chống: {vacXin.prevention}
          </Typography>
          <Typography variant="body2">Nguồn gốc: {vacXin.origin}</Typography>
          <Image
            src="https://lh5.googleusercontent.com/vo_49lXT-w6F-fOUrPo1WFOglAlAzBLNsPhxkgmu8S_f70dpzIFEpSgP1fQxOWwRWwdf8ryUqr4uh8Yqo_jyBfbzfc62ZHkwKyq_bAPoQaGLat_N9N0lR-4ZvXQAOI3WbdQME-5B"
            alt="vaccineImage"
            sizes="100vw"
            width={500}
            height={200}
          />
        </Grid>
      </Grid>
    </Layout>
  )
}

export default VaccineDetail
