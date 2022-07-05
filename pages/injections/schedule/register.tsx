import React, { useState } from 'react'
import { NextPage } from 'next'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import dayjs from 'dayjs'
import Layout from '~/components/layout'
import ErrorAlert from '~/components/errorAlert'
import {
  KhachHang,
  NguoiGiamHo,
  PhieuDKTiem,
  RegisterInjections,
} from '~/model'
import { RestartAlt } from '@mui/icons-material'
import SaveIcon from '@mui/icons-material/Save'
import LoadingButton from '@mui/lab/LoadingButton'
import VaccineItem from '~/components/vaccineItem'
import { useAppSelector } from '~/redux/hook'
import { v4 as uuidv4 } from 'uuid'
import GoiTiemItem from '~/components/goiTiemItem'

const taoKhachHang = async (khachHang: KhachHang) => {
  const res = await fetch('http://localhost:5000/api/khach-hang', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(khachHang),
  })
  const data = await res.json()
  return data.khachHang
}
const taoPhieuDKTiem = async (phieuDKTiem: PhieuDKTiem) => {
  const res = await fetch('http://localhost:5000/api/phieu-dk-tiem', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(phieuDKTiem),
  })
  const data = await res.json()
  return data.phieuDKTiem
}
const taoNguoiGiamHo = async (nguoiGiamHo: NguoiGiamHo) => {
  const res = await fetch('http://localhost:5000/api/nguoi-giam-ho', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(nguoiGiamHo),
  })
  const data = await res.json()
  return data.nguoiGiamHo
}

const ScheduleRegister: NextPage = () => {
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
    const khachHang: KhachHang = await taoKhachHang(data.khachHang)

    if (khachHang) {
      data.phieuDKTiem = {
        ...data.phieuDKTiem,
        MaKhachHang: khachHang.MaKhachHang,
      }
      const phieuDKTiem: PhieuDKTiem = await taoPhieuDKTiem(data.phieuDKTiem)
      if (phieuDKTiem) {
        data.nguoiGiamHo = {
          ...data.nguoiGiamHo,
          MaPhieuDK: phieuDKTiem.MaPhieuDK,
        }
        const nguoiGiamHo: NguoiGiamHo = await taoNguoiGiamHo(data.nguoiGiamHo)
        if (nguoiGiamHo) {
          alert('THÀNH CÔNG')
        }
      }
    }
    reset()
    setLoadingRegister(false)
  }

  let yourDate = dayjs(new Date()).format('YYYY-MM-DD')

  const cartVaccines = useAppSelector((state) => state.cart.vaccines)
  const cartGoiTiem = useAppSelector((state) => state.cart.goiTiem)

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
                name="khachHang.TenKhachHang"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Grid container direction="column">
                    <TextField
                      {...register('khachHang.TenKhachHang', {
                        validate: (value) => value !== '',
                      })}
                      size="small"
                      label="Họ tên người tiêm"
                      variant="outlined"
                      // required
                      {...field}
                    />
                    {errors.khachHang?.TenKhachHang && (
                      <ErrorAlert message="Vui lòng điền tên" />
                    )}
                  </Grid>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="khachHang.NgaySinh"
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
                name="khachHang.GioiTinh"
                control={control}
                defaultValue={0}
                render={({ field }) => (
                  <Grid item container direction="row">
                    <ToggleButtonGroup
                      size="small"
                      {...field}
                      exclusive
                      color="primary"
                    >
                      <ToggleButton value={0}>Nam</ToggleButton>
                      <ToggleButton value={1}>Nữ</ToggleButton>
                    </ToggleButtonGroup>
                  </Grid>
                )}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Controller
                name="khachHang.SoTaiKhoan"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Grid container direction="column">
                    <TextField
                      size="small"
                      label="Số tài khoản"
                      {...register('khachHang.SoTaiKhoan', {
                        validate: (value) => value !== '',
                      })}
                      variant="outlined"
                      {...field}
                    />
                    {errors.khachHang?.SoTaiKhoan && (
                      <ErrorAlert message="Vui lòng điền số tài khoản" />
                    )}
                  </Grid>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Controller
                name="khachHang.SoDienThoai"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Grid container direction="column">
                    <TextField
                      size="small"
                      label="Số điện thoại"
                      {...register('khachHang.SoDienThoai', {
                        validate: (value) => value !== '',
                      })}
                      variant="outlined"
                      {...field}
                    />
                    {errors.khachHang?.SoDienThoai && (
                      <ErrorAlert message="Vui lòng điền số điện thoại" />
                    )}
                  </Grid>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="khachHang.DiaChi"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Grid container direction="column">
                    <TextField
                      size="small"
                      label="Địa chỉ"
                      {...register('khachHang.DiaChi', {
                        validate: (value) => value !== '',
                      })}
                      variant="outlined"
                      {...field}
                    />
                    {errors.khachHang?.DiaChi && (
                      <ErrorAlert message="Vui lòng nhập địa chỉ" />
                    )}
                  </Grid>
                )}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="nguoiGiamHo.TenNguoiGiamHo"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Grid container direction="column">
                    <TextField
                      size="small"
                      label="Họ tên người giám hộ"
                      {...register('nguoiGiamHo.TenNguoiGiamHo', {
                        validate: (value) => value !== '',
                      })}
                      variant="outlined"
                      {...field}
                    />
                    {errors.nguoiGiamHo?.TenNguoiGiamHo && (
                      <ErrorAlert message="Vui lòng điền tên người giám hộ" />
                    )}
                  </Grid>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="nguoiGiamHo.MoiQuanHe"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Grid container direction="column">
                    <TextField
                      size="small"
                      label="Mối quan hệ với người tiêm"
                      {...register('nguoiGiamHo.MoiQuanHe', {
                        validate: (value) => value !== '',
                      })}
                      variant="outlined"
                      {...field}
                    />
                    {errors.nguoiGiamHo?.MoiQuanHe && (
                      <ErrorAlert message="Vui lòng điền mối quan hệ với người tiêm" />
                    )}
                  </Grid>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="nguoiGiamHo.SoDienThoai"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Grid container direction="column">
                    <TextField
                      size="small"
                      label="Số điện thoại người giám hộ"
                      {...register('nguoiGiamHo.SoDienThoai', {
                        validate: (value) => value !== '',
                      })}
                      variant="outlined"
                      {...field}
                    />
                    {errors.nguoiGiamHo?.SoDienThoai && (
                      <ErrorAlert message="Vui lòng điền số điện thoại người giám hộ" />
                    )}
                  </Grid>
                )}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="phieuDKTiem.NgayLap"
              control={control}
              defaultValue={yourDate}
              render={({ field }) => (
                <Grid container direction="column">
                  <TextField
                    type="date"
                    size="small"
                    label="Ngày lập"
                    variant="outlined"
                    disabled
                    {...field}
                  />
                </Grid>
              )}
            />
          </Grid>

          <Grid item xs={12} container spacing={2}>
            {cartVaccines?.map((vaccine) => (
              <Grid key={uuidv4()} item xs={12} md={6} lg={3}>
                <Paper elevation={12} sx={{ borderRadius: 5 }}>
                  <VaccineItem vaccine={vaccine} />
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Grid item xs={12} container spacing={2}>
            {cartGoiTiem?.map((goiTiem) => (
              <Grid key={uuidv4()} item xs={12} md={6} lg={3}>
                <Paper elevation={12} sx={{ borderRadius: 5 }}>
                  <GoiTiemItem goiTiem={goiTiem} />
                </Paper>
              </Grid>
            ))}
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

export default ScheduleRegister
