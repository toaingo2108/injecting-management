import { LoadingButton } from '@mui/lab'
import {
  Box,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import MyModal from '~/components/modal'
import { GoiTiem, HoaDon, NhanVienTrungTam, PhieuDKTiem, VacXin } from '~/model'
import ErrorAlert from '../errorAlert'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'
import { MonetizationOn } from '@mui/icons-material'
import { getDsNhanVienTrungTam, taoHoaDon, totalPriceCart } from '~/src/utils'
import { useAppDispatch } from '~/redux/hook'
import modalSlice from '../modal/modalSlice'
import { useRouter } from 'next/router'

interface Props {
  phieuDKTiem: PhieuDKTiem
  dsGoiTiem: GoiTiem[]
  dsVacXin: VacXin[]
  isDatMua?: boolean
}

const ModalThanhToanPhieuDK = ({
  phieuDKTiem,
  dsGoiTiem,
  dsVacXin,
  isDatMua,
}: Props) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<HoaDon>()

  const [dsNhanVienTrungTam, setdsNhanVienTrungTam] = useState<
    NhanVienTrungTam[]
  >([])

  const tongTienThanhToan = totalPriceCart(dsVacXin, dsGoiTiem)

  useEffect(() => {
    async function getDsNVTT() {
      try {
        const data = await getDsNhanVienTrungTam()
        if (data) {
          setdsNhanVienTrungTam(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getDsNVTT()
  }, [])

  const [loadingRegister, setLoadingRegister] = useState(false)

  setValue('MaPhieuDK', phieuDKTiem.MaPhieuDK)
  const onSubmit: SubmitHandler<HoaDon> = async (data) => {
    setLoadingRegister(true)
    setValue('TongTien', tongTienThanhToan)
    const hoaDon = await taoHoaDon(data)
    if (hoaDon) {
      router.push(`/sheets/${phieuDKTiem.MaPhieuDK}`)
      dispatch(modalSlice.actions.closeModal())
    } else {
      alert('Bạn vui lòng thanh toán lại, có sự cố')
    }
    setLoadingRegister(false)
  }

  let yourDate = dayjs(new Date()).format('YYYY-MM-DD')

  return (
    <MyModal>
      <Grid container direction="column">
        <Grid item>
          <Typography variant="h5" color="primary" fontWeight="bold">
            Thanh toán phiếu {isDatMua ? 'đặt mua' : 'đăng ký'} [
            {phieuDKTiem.MaPhieuDK}]
          </Typography>
        </Grid>
        <Grid item>
          <Divider sx={{ my: 1 }} />
        </Grid>
        <Grid item>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} mt={6}>
            <Grid container direction="column" spacing={4}>
              <Grid item>
                <Controller
                  name="NgayLap"
                  control={control}
                  defaultValue={yourDate}
                  render={({ field }) => (
                    <Grid container direction="column">
                      <TextField
                        type="date"
                        size="small"
                        label="Ngày lập"
                        variant="outlined"
                        {...field}
                      />
                    </Grid>
                  )}
                />
              </Grid>

              <Grid item>
                <Controller
                  name="LoaiThanhToan"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <Grid container direction="column">
                      <Grid item>
                        <FormControl fullWidth variant="filled">
                          <InputLabel>Loại thanh toán</InputLabel>
                          <Select {...field}>
                            {['Online', 'Trực tiếp'].map((item, index) => (
                              <MenuItem key={uuidv4()} value={index}>
                                {item}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  )}
                />
              </Grid>

              <Grid item>
                <Controller
                  name="MaNhanVien"
                  control={control}
                  defaultValue={1}
                  render={({ field }) => (
                    <Grid container direction="column">
                      <Grid item>
                        <FormControl
                          fullWidth
                          variant="filled"
                          sx={{ minWidth: 120 }}
                        >
                          <InputLabel>Nhân viên</InputLabel>
                          <Select
                            {...field}
                            {...register('MaNhanVien', {
                              validate: (value) => value !== 0,
                            })}
                          >
                            {dsNhanVienTrungTam?.map((item) => (
                              <MenuItem key={uuidv4()} value={item.MaNhanVien}>
                                {item.MaNhanVien} - {item.TenNhanVien} -{' '}
                                {item.TenTrungTam}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {errors.MaNhanVien && (
                          <ErrorAlert message="Vui lòng chọn nhân viên thanh toán" />
                        )}
                      </Grid>
                    </Grid>
                  )}
                />
              </Grid>

              <Grid item>
                <Controller
                  name="NgayThanhToan"
                  control={control}
                  defaultValue={yourDate}
                  render={({ field }) => (
                    <Grid container direction="column">
                      <TextField
                        type="date"
                        size="small"
                        label="Ngày thanh toán"
                        variant="outlined"
                        disabled
                        {...field}
                      />
                    </Grid>
                  )}
                />
              </Grid>
              <Grid
                item
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <Typography variant="h5" color="primary" fontWeight="bold">
                    Tổng hoá đơn
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h4" color="error" fontWeight="bold">
                    {tongTienThanhToan.toLocaleString()} VNĐ
                  </Typography>
                </Grid>
              </Grid>

              <Grid item>
                <LoadingButton
                  loading={loadingRegister}
                  type="submit"
                  loadingPosition="start"
                  fullWidth
                  startIcon={<MonetizationOn />}
                  variant="contained"
                  size="large"
                >
                  Thanh toán
                </LoadingButton>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </MyModal>
  )
}

export default ModalThanhToanPhieuDK
