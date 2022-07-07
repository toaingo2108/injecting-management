import { GetServerSideProps, NextPage } from 'next'
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material'
import Layout from '~/components/layout'
import { LichLamViec, NhanVien } from '~/model'
import LichLamViecItem from '~/components/lichLamViecItem'
import NhanVienItem from '~/components/nhanVienItem'
import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'
import { LoadingButton } from '@mui/lab'
import { useRouter } from 'next/router'
import MyModal from '~/components/modal'
import { useAppDispatch } from '~/redux/hook'
import modalSlice from '~/components/modal/modalSlice'
import { dkLichLamViec } from '~/src/utils'
import { apiUrl } from '~/src/constants'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const maLich = ctx.params?.maLich
    const res = await fetch(`${apiUrl}/lich-lam-viec/${maLich}`)
    const data = await res.json()
    if (!data) {
      return {
        notFound: true,
      }
    }
    const lichLamViec: LichLamViec = data.lichLamViec

    const dataNhanVien = await fetch(
      `${apiUrl}/nhan-vien/dk-lich/${lichLamViec.MaLich}`
    ).then((data) => data.json())
    const dsNhanVien: NhanVien[] = dataNhanVien.dsNhanVien

    const dataNhanVienChuaDK = await fetch(
      `${apiUrl}/nhan-vien/chua-dk-lich/${lichLamViec.MaLich}`
    ).then((data) => data.json())
    const dsNhanVienChuaDK: NhanVien[] = dataNhanVienChuaDK.dsNhanVien

    return { props: { lichLamViec, dsNhanVien, dsNhanVienChuaDK } }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}

interface Props {
  lichLamViec: LichLamViec
  dsNhanVien: NhanVien[]
  dsNhanVienChuaDK: NhanVien[]
}

const ScheduleDetail: NextPage<Props> = ({
  lichLamViec,
  dsNhanVien,
  dsNhanVienChuaDK,
}) => {
  const router = useRouter()
  const [loadingRegister, setLoadingRegister] = useState(false)

  const dispatch = useAppDispatch()

  const [maNhanVien, setMaNhanVien] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setMaNhanVien(event.target.value)
  }

  const handleDKLichLamViec = async (MaLich: number, MaNhanVien: number) => {
    setLoadingRegister(true)
    await dkLichLamViec(MaLich, MaNhanVien)
    setLoadingRegister(false)
    router.reload()
    dispatch(modalSlice.actions.closeModal())
  }

  return (
    <Layout
      title={`Thông tin lịch làm việc ${lichLamViec.MaLich}`}
      titlePage={`Thông tin lịch làm việc ${lichLamViec.MaLich}`}
    >
      <Grid container direction="column" spacing={4}>
        <Grid item container spacing={2}>
          <Grid item xs={3}>
            <Paper elevation={6} sx={{ borderRadius: 5 }}>
              <LichLamViecItem lichLamViec={lichLamViec} />
            </Paper>
          </Grid>
        </Grid>
        <Grid item container direction="column" mt={4} spacing={4}>
          <Grid item container spacing={4}>
            <Grid item>
              <Typography variant="h5" color="primary">
                Danh sách nhân viên đã đăng ký
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={() => dispatch(modalSlice.actions.openModal())}
              >
                Đăng ký lịch [{lichLamViec.MaLich}] cho nhân viên
              </Button>
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            {dsNhanVien?.map((nhanVien) => (
              <Grid key={uuidv4()} item xs={3}>
                <Paper elevation={6} sx={{ borderRadius: 5 }}>
                  <NhanVienItem nhanVien={nhanVien} />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <MyModal>
        <Grid container direction="column" spacing={4}>
          <Grid item>
            <Typography variant="h6" component="h2">
              Đăng ký lịch [{lichLamViec.MaLich}]
            </Typography>
          </Grid>
          <Grid item>
            <FormControl fullWidth variant="standard" sx={{ minWidth: 120 }}>
              <InputLabel>Mã nhân viên</InputLabel>
              <Select value={maNhanVien} onChange={handleChange}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {dsNhanVienChuaDK?.map((item) => (
                  <MenuItem key={uuidv4()} value={`${item.MaNhanVien}`}>
                    {item.MaNhanVien}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <LoadingButton
              loading={loadingRegister}
              fullWidth
              variant="contained"
              onClick={() =>
                handleDKLichLamViec(lichLamViec.MaLich, +maNhanVien)
              }
              disabled={maNhanVien === ''}
            >
              Đăng ký lịch
            </LoadingButton>
          </Grid>
        </Grid>
      </MyModal>
    </Layout>
  )
}

export default ScheduleDetail
