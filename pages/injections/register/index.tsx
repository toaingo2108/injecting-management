import React from 'react'
import { NextPage } from 'next'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import {
  Box,
  Button,
  Grid,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import dayjs from 'dayjs'
import Layout from '~/components/layout'
import ErrorAlert from '~/components/errorAlert'
import { RegisterInjections } from '~/model'

const Register: NextPage = () => {
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<RegisterInjections>()

  const onSubmit: SubmitHandler<RegisterInjections> = (data) => {
    console.log(data)
  }

  let yourDate = dayjs(new Date()).format('YYYY-MM-DD')

  return (
    <Layout title="Đăng ký thông tin tiêm chủng">
      <p>
        Đăng ký thông tin tiêm chủng để tiết kiệm thời gian khi đến làm thủ tục
        tại quầy Lễ tân cho Quý Khách hàng, việc đăng ký thông tin tiêm chủng
        chưa hỗ trợ đặt lịch hẹn chính xác theo giờ.
      </p>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 6 }}>
        <Grid container direction="row" spacing={2}>
          <Grid item xs={6}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Grid container direction="column">
                  <TextField
                    {...register('name', {
                      validate: (value) => value !== '',
                    })}
                    label="Họ tên người tiêm"
                    variant="outlined"
                    {...field}
                  />
                  {errors.name && <ErrorAlert message="Vui lòng điền tên" />}
                </Grid>
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              name="birthday"
              control={control}
              defaultValue={yourDate}
              render={({ field }) => (
                <Grid container direction="column">
                  <TextField
                    type="date"
                    label="Ngày sinh người tiêm"
                    variant="outlined"
                    {...field}
                  />
                </Grid>
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              name="gender"
              control={control}
              defaultValue="male"
              render={({ field }) => (
                <Grid item container direction="row">
                  <ToggleButtonGroup {...field} exclusive color="primary">
                    <ToggleButton value="male">Nam</ToggleButton>
                    <ToggleButton value="female">Nữ</ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              name="province"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Grid container direction="column">
                  <TextField
                    label="Tỉnh thành"
                    {...register('province', {
                      validate: (value) => value !== '',
                    })}
                    variant="outlined"
                    {...field}
                  />
                  {errors.province && (
                    <ErrorAlert message="Vui lòng chọn tỉnh thành" />
                  )}
                </Grid>
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              name="district"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Grid container direction="column">
                  <TextField
                    label="Quận huyện"
                    {...register('district', {
                      validate: (value) => value !== '',
                    })}
                    variant="outlined"
                    {...field}
                  />
                  {errors.district && (
                    <ErrorAlert message="Vui lòng chọn quận huyện" />
                  )}
                </Grid>
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              name="ward"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Grid container direction="column">
                  <TextField
                    label="Phường xã"
                    {...register('ward', {
                      validate: (value) => value !== '',
                    })}
                    variant="outlined"
                    {...field}
                  />
                  {errors.ward && (
                    <ErrorAlert message="Vui lòng chọn phường xã" />
                  )}
                </Grid>
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              name="address"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Grid container direction="column">
                  <TextField
                    label="Số nhà, tên đường"
                    {...register('address', {
                      validate: (value) => value !== '',
                    })}
                    variant="outlined"
                    {...field}
                  />
                  {errors.address && (
                    <ErrorAlert message="Vui lòng điền số nhà, tên đường" />
                  )}
                </Grid>
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              name="contactName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Grid container direction="column">
                  <TextField
                    label="Họ tên người liên hệ"
                    {...register('contactName', {
                      validate: (value) => value !== '',
                    })}
                    variant="outlined"
                    {...field}
                  />
                  {errors.contactName && (
                    <ErrorAlert message="Vui lòng điền tên người liên hệ" />
                  )}
                </Grid>
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              name="contactRelationship"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Grid container direction="column">
                  <TextField
                    label="Mối quan hệ với người tiêm"
                    {...register('contactRelationship', {
                      validate: (value) => value !== '',
                    })}
                    variant="outlined"
                    {...field}
                  />
                  {errors.contactRelationship && (
                    <ErrorAlert message="Vui lòng điền mối quan hệ với người tiêm" />
                  )}
                </Grid>
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              name="contactPhone"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Grid container direction="column">
                  <TextField
                    label="Số điện thoại người liên hệ"
                    {...register('contactPhone', {
                      validate: (value) => value !== '',
                    })}
                    variant="outlined"
                    {...field}
                  />
                  {errors.contactPhone && (
                    <ErrorAlert message="Vui lòng điền số điện thoại" />
                  )}
                </Grid>
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              name="typeInjection"
              control={control}
              defaultValue="package"
              render={({ field }) => (
                <Grid container direction="column">
                  <ToggleButtonGroup exclusive color="primary" {...field}>
                    <ToggleButton value="package">Vắc xin gói</ToggleButton>
                    <ToggleButton value="odd">Vắc xin lẻ</ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              name="dateOfInjection"
              control={control}
              defaultValue={yourDate}
              render={({ field }) => (
                <Grid container direction="column">
                  <TextField
                    type="date"
                    label="Ngày mong muốn tiêm"
                    variant="outlined"
                    {...field}
                  />
                </Grid>
              )}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-end" sx={{ mt: 4 }}>
          <Button
            onClick={() => reset()}
            color="error"
            variant="contained"
            size="large"
            sx={{ mr: 2 }}
          >
            Xoá
          </Button>
          <Button type="submit" variant="contained" size="large">
            Đăng ký
          </Button>
        </Grid>
      </Box>
    </Layout>
  )
}

export default Register
