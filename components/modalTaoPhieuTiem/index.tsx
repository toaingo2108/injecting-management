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
import { NhanVienTrungTam, PhieuTiem } from '~/model'
import ErrorAlert from '../errorAlert'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'
import { AddCircle } from '@mui/icons-material'
import { getDsNhanVienTrungTam, taoPhieuTiem } from '~/src/utils'
import { useRouter } from 'next/router'
import { useAppDispatch } from '~/redux/hook'
import modalSlice from '../modal/modalSlice'

const ModalTaoPhieuTiem = () => {
  const router = useRouter()
  const MaPhieuDK: number =
    typeof router.query?.maPhieuDK === 'string' ? +router.query?.maPhieuDK : 0
  const dispatch = useAppDispatch()
  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<PhieuTiem>()

  const [dsNhanVienTrungTam, setdsNhanVienTrungTam] = useState<
    NhanVienTrungTam[]
  >([])

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

  setValue('MaPhieuDK', MaPhieuDK)
  const onSubmit: SubmitHandler<PhieuTiem> = async (data) => {
    setLoadingRegister(true)
    await taoPhieuTiem(data)
    router.push(router.asPath)
    setLoadingRegister(false)
    dispatch(modalSlice.actions.closeModal())
  }

  let yourDate = dayjs(new Date()).format('YYYY-MM-DD')

  return (
    <MyModal>
      <Grid container direction="column">
        <Grid item>
          <Typography variant="h5" color="primary" fontWeight="bold">
            Thêm phiếu tiêm
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
                          <ErrorAlert message="Vui lòng chọn nhân viên tiêm" />
                        )}
                      </Grid>
                    </Grid>
                  )}
                />
              </Grid>
              <Grid item>
                <Controller
                  name="NgayTiem"
                  control={control}
                  defaultValue={yourDate}
                  render={({ field }) => (
                    <Grid container direction="column">
                      <TextField
                        type="date"
                        size="small"
                        label="Ngày tiêm"
                        variant="outlined"
                        {...field}
                      />
                    </Grid>
                  )}
                />
              </Grid>

              <Grid item>
                <Controller
                  name="KetQuaKham"
                  control={control}
                  defaultValue="Đạt"
                  render={({ field }) => (
                    <Grid container direction="column">
                      <Grid item>
                        <FormControl fullWidth variant="filled">
                          <InputLabel>Kết quả khám</InputLabel>
                          <Select {...field}>
                            {['Không đạt', 'Đạt'].map((item) => (
                              <MenuItem key={uuidv4()} value={item}>
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
                  name="KetQuaSauTiem"
                  control={control}
                  defaultValue="Chưa có kết quả"
                  render={({ field }) => (
                    <Grid container direction="column">
                      <Grid item>
                        <FormControl fullWidth variant="filled">
                          <InputLabel>Kết quả sau tiêm</InputLabel>
                          <Select {...field}>
                            {[
                              'Chưa có kết quả',
                              'Thành công',
                              'Không thành công',
                            ].map((item) => (
                              <MenuItem key={uuidv4()} value={item}>
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
                  name="TrangThai"
                  control={control}
                  defaultValue="Đã khám"
                  render={({ field }) => (
                    <Grid container direction="column">
                      <Grid item>
                        <FormControl fullWidth variant="filled">
                          <InputLabel>Trạng thái</InputLabel>
                          <Select {...field}>
                            {[
                              'Chưa khám',
                              'Đang khám',
                              'Bỏ qua',
                              'Đã khám',
                            ].map((item) => (
                              <MenuItem key={uuidv4()} value={item}>
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
                  name="STT"
                  control={control}
                  defaultValue={1}
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

              <Grid item>
                <LoadingButton
                  loading={loadingRegister}
                  type="submit"
                  loadingPosition="start"
                  fullWidth
                  startIcon={<AddCircle />}
                  variant="contained"
                  size="large"
                >
                  Tạo phiếu tiêm
                </LoadingButton>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </MyModal>
  )
}

export default ModalTaoPhieuTiem
