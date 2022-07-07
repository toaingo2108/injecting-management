import React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { Grid, Paper } from '@mui/material'
import Layout from '~/components/layout'
import { v4 as uuidv4 } from 'uuid'
import { TrungTam } from '~/model'
import { apiUrl } from '~/src/constants'
import TrungTamItem from '~/components/trungTamItem'

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${apiUrl}/trung-tam`)
  const data = await res.json()
  if (!data) {
    return {
      notFound: true,
    }
  }
  const dsTrungTam: TrungTam[] = data.dsTrungTam
  return { props: { dsTrungTam } }
}

interface Props {
  dsTrungTam: TrungTam[]
}

const Centers: NextPage<Props> = ({ dsTrungTam }) => {
  return (
    <Layout title="Tra cứu trung tâm" titlePage="Các trung tâm">
      <Grid container spacing={6}>
        <Grid item xs={12} container spacing={2} alignContent="flex-start">
          {dsTrungTam?.map((item) => (
            <Grid key={uuidv4()} item xs={12} md={6} lg={3}>
              <Paper elevation={24} sx={{ borderRadius: 5 }}>
                <TrungTamItem trungTam={item} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Centers
