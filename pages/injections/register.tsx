import React, { useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@mui/material'
import dayjs from 'dayjs'
import Layout from '~/components/layout'
import ErrorAlert from '~/components/errorAlert'
import {
  KhachHang,
  PhieuDKTiem,
  PhieuTiem,
  RegisterInjections,
  TrungTam,
} from '~/model'
import { RestartAlt } from '@mui/icons-material'
import SaveIcon from '@mui/icons-material/Save'
import LoadingButton from '@mui/lab/LoadingButton'
import VaccineItem from '~/components/vaccineItem'
import { useAppSelector } from '~/redux/hook'
import { v4 as uuidv4 } from 'uuid'
import GoiTiemItem from '~/components/goiTiemItem'
import {
  taoDKTiem,
  taoKhachHang,
  taoNguoiGiamHo,
  taoPhieuDKTiem,
  taoPhieuTiem_temp,
} from '~/src/utils'
import { apiUrl } from '~/src/constants'
import { useRouter } from 'next/router'

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch(`${apiUrl}/trung-tam`)
    const data = await res.json()
    if (!data) {
      return {
        notFound: true,
      }
    }
    const dsTrungTam: TrungTam[] = data.dsTrungTam
    return { props: { dsTrungTam } }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}

interface Props {
  dsTrungTam: TrungTam[]
}

const ScheduleRegister: NextPage<Props> = ({ dsTrungTam }) => {
  const cart = useAppSelector((state) => state.cart)
  const cartVaccines = useAppSelector((state) => state.cart.vaccines)
  const cartGoiTiem = useAppSelector((state) => state.cart.goiTiem)

  // const [maKhachHang, setMaKhachHang] = useState<number>(0)

  const router = useRouter()

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
          MaKhachHang: khachHang.MaKhachHang,
          MaPhieuDK: phieuDKTiem.MaPhieuDK,
        }
        if (data.nguoiGiamHo.TenNguoiGiamHo !== '') {
          await taoNguoiGiamHo(data.nguoiGiamHo)
        }
        const phieuTiem: PhieuTiem = await taoPhieuTiem_temp(
          phieuDKTiem.MaPhieuDK
        )
        const { success } = await taoDKTiem(
          phieuDKTiem,
          data.MaTrungTam,
          data.NgayTiem,
          cart,
          phieuTiem.MaPhieuTiem
        )
        if (success) {
          alert('THÀNH CÔNG')
          router.push(`/sheets/${phieuDKTiem.MaPhieuDK}`)
          reset()
        } else alert('THẤT BẠI')
      }
    }
    setLoadingRegister(false)
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
                render={({ field }) => (
                  <Grid item container direction="row">
                    <FormControl fullWidth variant="filled">
                      <InputLabel>Chọn giới tính</InputLabel>
                      <Select {...field}>
                        <MenuItem value={0}>Nữ</MenuItem>
                        <MenuItem value={1}>Nam</MenuItem>
                      </Select>
                    </FormControl>
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
                      type="number"
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

            <Grid item xs={12} sm={4}>
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
                      variant="outlined"
                      {...field}
                    />
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
                      variant="outlined"
                      {...field}
                    />
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
                      variant="outlined"
                      {...field}
                    />
                  </Grid>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="NgayTiem"
                control={control}
                defaultValue={yourDate}
                render={({ field }) => (
                  <Grid container direction="column">
                    <TextField
                      type="date"
                      size="small"
                      label="Chọn ngày tiêm mong muốn"
                      variant="outlined"
                      {...field}
                    />
                  </Grid>
                )}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="phieuDKTiem.TrangThai"
                control={control}
                defaultValue="Chưa khám"
                render={({ field }) => (
                  <Grid container direction="column">
                    <Grid item>
                      <FormControl fullWidth variant="filled">
                        <InputLabel>Trạng thái khám sàn lọc</InputLabel>
                        <Select
                          {...field}
                          {...register('phieuDKTiem.TrangThai', {
                            validate: (value) => value !== '',
                          })}
                        >
                          {['Chưa khám', 'Đang khám', 'Bỏ qua', 'Đã khám'].map(
                            (item) => (
                              <MenuItem key={uuidv4()} value={item}>
                                {item}
                              </MenuItem>
                            )
                          )}
                        </Select>
                      </FormControl>
                      {errors.MaTrungTam && (
                        <ErrorAlert message="Vui lòng không để trống mục này" />
                      )}
                    </Grid>
                  </Grid>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="phieuDKTiem.KetQuaKhamSL"
                control={control}
                defaultValue="Không đạt"
                render={({ field }) => (
                  <Grid container direction="column">
                    <Grid item>
                      <FormControl fullWidth variant="filled">
                        <InputLabel>Kết quả khám sàn lọc</InputLabel>
                        <Select
                          {...field}
                          {...register('phieuDKTiem.KetQuaKhamSL', {
                            validate: (value) => value !== '',
                          })}
                        >
                          {['Không đạt', 'Đạt'].map((item) => (
                            <MenuItem key={uuidv4()} value={item}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {errors.phieuDKTiem?.KetQuaKhamSL && (
                        <ErrorAlert message="Vui lòng không để trống mục này" />
                      )}
                    </Grid>
                  </Grid>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="MaTrungTam"
                control={control}
                defaultValue={0}
                render={({ field }) => (
                  <Grid container direction="column">
                    <Grid item>
                      <FormControl
                        fullWidth
                        variant="filled"
                        sx={{ minWidth: 120 }}
                      >
                        <InputLabel>Chọn trung tâm đăng ký tiêm</InputLabel>
                        <Select
                          {...field}
                          {...register('MaTrungTam', {
                            validate: (value) => value !== 0,
                          })}
                        >
                          {dsTrungTam?.map((item) => (
                            <MenuItem key={uuidv4()} value={item.MaTrungTam}>
                              {item.MaTrungTam} - {item.TenTrungTam} -{' '}
                              {item.DiaChi}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {errors.MaTrungTam && (
                        <ErrorAlert message="Vui lòng chọn trung tâm tiêm chủng" />
                      )}
                    </Grid>
                  </Grid>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="phieuDKTiem.STT"
                control={control}
                render={({ field }) => (
                  <Grid container direction="column">
                    <TextField
                      type="number"
                      size="small"
                      label="STT"
                      variant="outlined"
                      {...field}
                    />
                  </Grid>
                )}
              />
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
              <LoadingButton
                loading={loadingRegister}
                type="submit"
                loadingPosition="start"
                fullWidth
                startIcon={<SaveIcon />}
                variant="contained"
                size="large"
                disabled={cartGoiTiem.length === 0 && cartVaccines.length === 0}
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
