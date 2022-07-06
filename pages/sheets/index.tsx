import React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { Grid, Paper } from '@mui/material'
import Layout from '~/components/layout'
import { v4 as uuidv4 } from 'uuid'
import { PhieuDKTiem } from '~/model'
import PhieuDKTiemItem from '~/components/phieuDKTiemItem'

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('http://localhost:5000/api/phieu-dk-tiem')
  const data = await res.json()
  if (!data) {
    return {
      notFound: true,
    }
  }
  const dsPhieuDKTiem: PhieuDKTiem[] = data.dsPhieuDKTiem
  return { props: { dsPhieuDKTiem } }
}

interface Props {
  dsPhieuDKTiem: PhieuDKTiem[]
}
const Sheets: NextPage<Props> = ({ dsPhieuDKTiem }) => {
  return (
    <Layout
      title="Phiếu đăng ký tiêm chủng"
      titlePage="Danh sách các phiếu đã đăng ký"
    >
      <Grid container spacing={6}>
        <Grid item xs={12} container spacing={2} alignContent="flex-start">
          {dsPhieuDKTiem?.map((item) => (
            <Grid key={uuidv4()} item xs={12} md={6} lg={3}>
              <Paper elevation={6} sx={{ borderRadius: 5 }}>
                <PhieuDKTiemItem phieuDKTiem={item} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Sheets
