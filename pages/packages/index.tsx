import React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { Grid, Paper } from '@mui/material'
import Layout from '~/components/layout'
import { v4 as uuidv4 } from 'uuid'
import { GoiTiem } from '~/model'
import Cart from '~/components/cart'
import GoiTiemItem from '~/components/goiTiemItem'
import { apiUrl } from '~/src/constants'

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch(`${apiUrl}/goi-tiem`)
    const data = await res.json()
    if (!data) {
      return {
        notFound: true,
      }
    }
    const dsGoiTiem: GoiTiem[] = data.dsGoiTiem
    return { props: { dsGoiTiem } }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}

interface Props {
  dsGoiTiem: GoiTiem[]
}

const Package: NextPage<Props> = ({ dsGoiTiem }) => {
  return (
    <Layout title="Tra cứu gói tiêm" titlePage="Danh mục gói vắc xin">
      <Grid container spacing={6}>
        <Grid
          item
          xs={12}
          lg={8}
          container
          spacing={2}
          alignContent="flex-start"
        >
          {dsGoiTiem.map((goiTiem) => (
            <Grid key={uuidv4()} item xs={12} md={6} lg={4}>
              <Paper elevation={24} sx={{ borderRadius: 5 }}>
                <GoiTiemItem goiTiem={goiTiem} action />
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

export default Package
