import React, { useState } from 'react'
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
import { RestartAlt } from '@mui/icons-material'
import SaveIcon from '@mui/icons-material/Save'
import LoadingButton from '@mui/lab/LoadingButton'

const Register: NextPage = () => {
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<RegisterInjections>()

  const [loadingRegister, setLoadingRegister] = useState(false)

  const onSubmit: SubmitHandler<RegisterInjections> = async (data) => {
    setLoadingRegister(true)
    setTimeout(() => {
      console.log(data)
      reset()
      setLoadingRegister(false)
    }, 3000)
  }

  let yourDate = dayjs(new Date()).format('YYYY-MM-DD')

  return (
    <Layout title="Đăng ký thông tin tiêm chủng" titlePage="Đăng ký tiêm chủng">
      <p>
        Đăng ký thông tin tiêm chủng để tiết kiệm thời gian khi đến làm thủ tục
        tại quầy Lễ tân cho Quý Khách hàng, việc đăng ký thông tin tiêm chủng
        chưa hỗ trợ đặt lịch hẹn chính xác theo giờ.
      </p>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} mt={6}>
        <Grid container direction="row" spacing={4}>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={6}>
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
                      size="small"
                      label="Họ tên người tiêm"
                      variant="outlined"
                      // required
                      {...field}
                    />
                    {errors.name && <ErrorAlert message="Vui lòng điền tên" />}
                  </Grid>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="birthday"
                control={control}
                defaultValue={yourDate}
                render={({ field }) => (
                  <Grid container direction="column">
                    <TextField
                      type="date"
                      size="small"
                      label="Ngày sinh người tiêm"
                      variant="outlined"
                      {...field}
                    />
                  </Grid>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="gender"
                control={control}
                defaultValue="male"
                render={({ field }) => (
                  <Grid item container direction="row">
                    <ToggleButtonGroup
                      size="small"
                      {...field}
                      exclusive
                      color="primary"
                    >
                      <ToggleButton value="male">Nam</ToggleButton>
                      <ToggleButton value="female">Nữ</ToggleButton>
                    </ToggleButtonGroup>
                  </Grid>
                )}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Controller
                name="province"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Grid container direction="column">
                    <TextField
                      size="small"
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

            <Grid item xs={12} sm={4}>
              <Controller
                name="district"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Grid container direction="column">
                    <TextField
                      size="small"
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

            <Grid item xs={12} sm={4}>
              <Controller
                name="ward"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Grid container direction="column">
                    <TextField
                      size="small"
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

            <Grid item xs={12}>
              <Controller
                name="address"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Grid container direction="column">
                    <TextField
                      size="small"
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
          </Grid>

          <Grid item xs={12} container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="contactName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Grid container direction="column">
                    <TextField
                      size="small"
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

            <Grid item xs={12} sm={6}>
              <Controller
                name="contactRelationship"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Grid container direction="column">
                    <TextField
                      size="small"
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

            <Grid item xs={12} sm={6}>
              <Controller
                name="contactPhone"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Grid container direction="column">
                    <TextField
                      size="small"
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
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="typeInjection"
              control={control}
              defaultValue="package"
              render={({ field }) => (
                <Grid container direction="column">
                  <ToggleButtonGroup
                    size="small"
                    exclusive
                    color="primary"
                    {...field}
                  >
                    <ToggleButton value="package">Vắc xin gói</ToggleButton>
                    <ToggleButton value="odd">Vắc xin lẻ</ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="dateOfInjection"
              control={control}
              defaultValue={yourDate}
              render={({ field }) => (
                <Grid container direction="column">
                  <TextField
                    type="date"
                    size="small"
                    label="Ngày mong muốn tiêm"
                    variant="outlined"
                    {...field}
                  />
                </Grid>
              )}
            />
          </Grid>
          <Grid item container justifyContent="flex-end" spacing={1}>
            <Grid item xs={12} sm={2}>
              <Button
                fullWidth
                onClick={() => reset()}
                color="error"
                variant="contained"
                size="large"
              >
                <Grid container justifyContent="center">
                  <RestartAlt sx={{ mr: 1 }} />
                  Khôi phục
                </Grid>
              </Button>
            </Grid>
            <Grid item xs={12} sm={2}>
              {/* <Button type="submit" variant="contained" fullWidth size="large">
                Hoàn thành đăng ký
              </Button> */}
              <LoadingButton
                loading={loadingRegister}
                type="submit"
                loadingPosition="start"
                fullWidth
                startIcon={<SaveIcon />}
                variant="contained"
                size="large"
              >
                Hoàn thành đăng ký
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  )
}

export default Register
