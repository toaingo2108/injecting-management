import React, { useEffect, useState } from 'react'
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
import { useAppDispatch, useAppSelector } from '~/redux/hook'
import { v4 as uuidv4 } from 'uuid'
import GoiTiemItem from '~/components/goiTiemItem'
import {
  getKhachHang,
  taoDKTiem,
  taoKhachHang,
  taoNguoiGiamHo,
  taoPhieuDKTiem,
  taoPhieuTiem_temp,
} from '~/src/utils'
import { apiUrl } from '~/src/constants'
import { useRouter } from 'next/router'
import myAlertSlice from '~/components/myAlert/myAlertSlice'

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
  const dispatch = useAppDispatch()
  const [maKhachHang, setMaKhachHang] = useState<number>(0)
  const [khachHangOld, setKhachHangOld] = useState<KhachHang>()
  useEffect(() => {
    async function getKH() {
      const khachHang: KhachHang = await getKhachHang(maKhachHang)
      if (khachHang) {
        setKhachHangOld(khachHang)
      }
    }
    getKH()
  }, [maKhachHang])

  const router = useRouter()

  const {
    control,
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm<RegisterInjections>()

  useEffect(() => {
    if (typeof khachHangOld !== 'undefined') {
      setValue('khachHang', khachHangOld)
      setValue(
        'khachHang.NgaySinh',
        dayjs(khachHangOld.NgaySinh).format('YYYY-MM-DD')
      )
    }
  }, [khachHangOld, setValue])

  const [loadingRegister, setLoadingRegister] = useState(false)

  const onSubmit: SubmitHandler<RegisterInjections> = async (data) => {
    setLoadingRegister(true)
    let khachHang: KhachHang
    if (khachHangOld) {
      khachHang = khachHangOld
    } else {
      khachHang = await taoKhachHang(data.khachHang)
    }
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
          dispatch(
            myAlertSlice.actions.openAlert({
              title: '????ng k?? th??nh c??ng',
              type: 'success',
            })
          )
          router.push(`/sheets/${phieuDKTiem.MaPhieuDK}`)
          reset()
        } else {
          dispatch(
            myAlertSlice.actions.openAlert({
              title: '????ng k?? th???t b???i',
              type: 'error',
            })
          )
        }
      }
    }
    setLoadingRegister(false)
  }

  let yourDate = dayjs(new Date()).format('YYYY-MM-DD')

  return (
    <Layout title="????ng k?? th??ng tin ti??m ch???ng" titlePage="????ng k?? ti??m ch???ng">
      <p>
        ????ng k?? th??ng tin ti??m ch???ng ????? ti???t ki???m th???i gian khi ?????n l??m th??? t???c
        t???i qu???y L??? t??n cho Qu?? Kh??ch h??ng, vi???c ????ng k?? th??ng tin ti??m ch???ng
        ch??a h??? tr??? ?????t l???ch h???n ch??nh x??c theo gi???.
      </p>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} mt={6}>
        <Grid container direction="row" spacing={4}>
          <Grid item container spacing={2}>
            <Grid item container xs={12} spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  value={maKhachHang}
                  onChange={(e) => setMaKhachHang(+e.target.value)}
                  size="small"
                  label="M?? kh??ch h??ng n???u b???n l?? kh??ch h??ng th??n thi???t"
                  variant="outlined"
                />
              </Grid>
            </Grid>
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
                      label="H??? t??n ng?????i ti??m"
                      variant="outlined"
                      // required
                      {...field}
                    />
                    {errors.khachHang?.TenKhachHang && (
                      <ErrorAlert message="Vui l??ng ??i???n t??n" />
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
                      label="Ng??y sinh ng?????i ti??m"
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
                      <InputLabel>Ch???n gi???i t??nh</InputLabel>
                      <Select {...field}>
                        <MenuItem value={0}>N???</MenuItem>
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
                      label="S??? t??i kho???n"
                      {...register('khachHang.SoTaiKhoan', {
                        validate: (value) => value !== '',
                      })}
                      variant="outlined"
                      {...field}
                    />
                    {errors.khachHang?.SoTaiKhoan && (
                      <ErrorAlert message="Vui l??ng ??i???n s??? t??i kho???n" />
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
                      label="S??? ??i???n tho???i"
                      {...register('khachHang.SoDienThoai', {
                        validate: (value) => value !== '',
                      })}
                      variant="outlined"
                      {...field}
                    />
                    {errors.khachHang?.SoDienThoai && (
                      <ErrorAlert message="Vui l??ng ??i???n s??? ??i???n tho???i" />
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
                      label="?????a ch???"
                      {...register('khachHang.DiaChi', {
                        validate: (value) => value !== '',
                      })}
                      variant="outlined"
                      {...field}
                    />
                    {errors.khachHang?.DiaChi && (
                      <ErrorAlert message="Vui l??ng nh???p ?????a ch???" />
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
                      label="H??? t??n ng?????i gi??m h???"
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
                      label="M???i quan h??? v???i ng?????i ti??m"
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
                      label="S??? ??i???n tho???i ng?????i gi??m h???"
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
                      label="Ch???n ng??y ti??m mong mu???n"
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
                defaultValue="Ch??a kh??m"
                render={({ field }) => (
                  <Grid container direction="column">
                    <Grid item>
                      <FormControl fullWidth variant="filled">
                        <InputLabel>Tr???ng th??i kh??m s??n l???c</InputLabel>
                        <Select
                          disabled
                          {...field}
                          {...register('phieuDKTiem.TrangThai', {
                            validate: (value) => value !== '',
                          })}
                        >
                          {['Ch??a kh??m', '??ang kh??m', 'B??? qua', '???? kh??m'].map(
                            (item) => (
                              <MenuItem key={uuidv4()} value={item}>
                                {item}
                              </MenuItem>
                            )
                          )}
                        </Select>
                      </FormControl>
                      {errors.MaTrungTam && (
                        <ErrorAlert message="Vui l??ng kh??ng ????? tr???ng m???c n??y" />
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
                defaultValue="Kh??ng ?????t"
                render={({ field }) => (
                  <Grid container direction="column">
                    <Grid item>
                      <FormControl fullWidth variant="filled">
                        <InputLabel>K???t qu??? kh??m s??n l???c</InputLabel>
                        <Select
                          disabled
                          {...field}
                          {...register('phieuDKTiem.KetQuaKhamSL', {
                            validate: (value) => value !== '',
                          })}
                        >
                          {['Kh??ng ?????t', '?????t'].map((item) => (
                            <MenuItem key={uuidv4()} value={item}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {errors.phieuDKTiem?.KetQuaKhamSL && (
                        <ErrorAlert message="Vui l??ng kh??ng ????? tr???ng m???c n??y" />
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
                        <InputLabel>Ch???n trung t??m ????ng k?? ti??m</InputLabel>
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
                        <ErrorAlert message="Vui l??ng ch???n trung t??m ti??m ch???ng" />
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
                      label="Ng??y l???p"
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
                  Kh??i ph???c
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
                Ho??n th??nh ????ng k??
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  )
}

export default ScheduleRegister
