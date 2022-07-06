import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import { GetServerSideProps, NextPage } from 'next'
import React, { useState } from 'react'
import Layout from '~/components/layout'
import { LichLamViec } from '~/model'
import { v4 as uuidv4 } from 'uuid'
import LichLamViecItem from '~/components/lichLamViecItem'
import MyModal from '~/components/modal'
import { LoadingButton } from '@mui/lab'
import { useAppDispatch } from '~/redux/hook'
import modalSlice from '~/components/modal/modalSlice'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import { taoLichLamViec } from '~/src/utils'
import { apiUrl } from '~/src/constants'

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${apiUrl}/lich-lam-viec`)
  const data = await res.json()
  if (!data) {
    return {
      notFound: true,
    }
  }
  const dsLichLamViec: LichLamViec[] = data.dsLichLamViec
  return { props: { dsLichLamViec } }
}

interface Props {
  dsLichLamViec: LichLamViec[]
}

const Schedule: NextPage<Props> = ({ dsLichLamViec }) => {
  const router = useRouter()
  let yourDate = dayjs(new Date()).format('YYYY-MM-DD')
  const [loadingRegister, setLoadingRegister] = useState(false)
  const dispatch = useAppDispatch()
  const { control, handleSubmit, reset } = useForm<LichLamViec>()

  const onSubmit: SubmitHandler<LichLamViec> = async (data) => {
    setLoadingRegister(true)
    await taoLichLamViec(data)
    reset()
    router.reload()
    setLoadingRegister(false)
  }

  return (
    <Layout title="Lịch làm việc" titlePage="Danh sách lịch làm việc">
      <Grid container spacing={6}>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => dispatch(modalSlice.actions.openModal())}
          >
            Tạo lịch làm việc mới
          </Button>
        </Grid>
        <Grid item xs={12} container spacing={2} alignContent="flex-start">
          {dsLichLamViec?.map((item) => (
            <Grid key={uuidv4()} item xs={12} md={6} lg={3}>
              <Paper elevation={24} sx={{ borderRadius: 5 }}>
                <LichLamViecItem lichLamViec={item} action />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <MyModal>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={4}>
            <Grid item container spacing={2}>
              <Grid item xs={12} md={6}>
                <Controller
                  name="Ngay"
                  control={control}
                  defaultValue={yourDate}
                  render={({ field }) => (
                    <Grid container direction="column">
                      <TextField
                        type="date"
                        size="small"
                        label="Ngày làm việc"
                        variant="outlined"
                        {...field}
                      />
                    </Grid>
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="Ca"
                  control={control}
                  render={({ field }) => (
                    <Grid
                      item
                      container
                      direction="row"
                      justifyContent="flex-end"
                    >
                      <ToggleButtonGroup
                        defaultValue={1}
                        size="small"
                        {...field}
                        exclusive
                        color="primary"
                      >
                        <ToggleButton value={1}>Ca 1</ToggleButton>
                        <ToggleButton value={2}>Ca 2</ToggleButton>
                        <ToggleButton value={3}>Ca 3</ToggleButton>
                        <ToggleButton value={4}>Ca 4</ToggleButton>
                      </ToggleButtonGroup>
                    </Grid>
                  )}
                />
              </Grid>
            </Grid>

            <Grid item container justifyContent="flex-end">
              <LoadingButton
                loading={loadingRegister}
                type="submit"
                fullWidth
                variant="contained"
                size="large"
              >
                Tạo lịch
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </MyModal>
    </Layout>
  )
}

export default Schedule
