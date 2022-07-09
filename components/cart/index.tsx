import { useAppDispatch, useAppSelector } from '~/redux/hook'
import {
  Box,
  Button,
  CardContent,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material'
import { BallotOutlined, ClearOutlined } from '@mui/icons-material'
import cartSlice from '~/components/cart/cartSlice'
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid'
import ListEmpty from '~/components/listEmpty'
import modalSlice from '~/components/modal/modalSlice'
import ModalThanhToanPhieuDK from '../modalThanhToanPhieuDK'
import { KhachHang, PhieuDKTiem, PhieuTiem } from '~/model'
import {
  getKhachHang,
  taoDKTiem,
  taoPhieuDKTiem,
  taoPhieuTiem_temp,
} from '~/src/utils'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { LoadingButton } from '@mui/lab'
import myAlertSlice from '../myAlert/myAlertSlice'

const Cart = () => {
  const cart = useAppSelector((state) => state.cart)
  const cartVaccines = useAppSelector((state) => state.cart.vaccines)
  const cartGoiTiem = useAppSelector((state) => state.cart.goiTiem)
  const dispatch = useAppDispatch()

  const handleDeleteVaccineCart = (MaVacXin: number) => {
    dispatch(cartSlice.actions.removeVaccineFromCart(MaVacXin))
  }
  const handleDeleteGoiTiemCart = (MaGoiTiem: number) => {
    dispatch(cartSlice.actions.removeGoiTiemFromCart(MaGoiTiem))
  }
  const [phieuDKDatMua, setPhieuDKDatMua] = useState<PhieuDKTiem>()
  const [maKhachHang, setMaKhachHang] = useState<number>(0)
  const [khachHangOld, setKhachHangOld] = useState<KhachHang>()

  const [loadingButton, setLoadingButton] = useState(false)

  const handleTaoPhieuDKDatMua = async () => {
    setLoadingButton(true)
    const phieuDKDatMua = await taoPhieuDKTiem({
      MaPhieuDK: 0,
      MaKhachHang: khachHangOld?.MaKhachHang ? khachHangOld?.MaKhachHang : 1,
      NgayLap: dayjs(new Date()).format('YYYY-MM-DD'),
      KetQuaKhamSL: 'Không đạt',
      TrangThai: 'Chưa khám',
      STT: Math.floor(Math.random() + 101),
    })
    setPhieuDKDatMua(phieuDKDatMua)
    const phieuTiem: PhieuTiem = await taoPhieuTiem_temp(
      phieuDKDatMua.MaPhieuDK
    )
    await taoDKTiem(
      phieuDKDatMua,
      1,
      dayjs(new Date()).format('YYYY-MM-DD'),
      cart,
      phieuTiem.MaPhieuTiem
    )
    setLoadingButton(false)
    dispatch(modalSlice.actions.openModal())
  }

  useEffect(() => {
    async function getKH() {
      const khachHang: KhachHang = await getKhachHang(maKhachHang)
      if (khachHang) {
        dispatch(
          myAlertSlice.actions.openAlert({
            title: 'Mã khách hàng hợp lệ',
            type: 'success',
          })
        )
      } else {
        dispatch(
          myAlertSlice.actions.openAlert({
            title: 'Mã khách hàng không hợp lệ',
            type: 'error',
          })
        )
      }
      setKhachHangOld(khachHang)
    }
    getKH()
  }, [maKhachHang, dispatch])

  return (
    <>
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          color="primary"
          fontWeight="bold"
          component="div"
        >
          <Grid container alignItems="center">
            <BallotOutlined fontSize="large" />
            Danh sách chọn mua
          </Grid>
        </Typography>
      </CardContent>
      <Divider />

      {cartVaccines.length === 0 && cartGoiTiem.length === 0 ? (
        <CardContent>
          <ListEmpty />
        </CardContent>
      ) : (
        <>
          {cartVaccines.map((item) => (
            <Box key={uuidv4()}>
              <CardContent>
                <Grid container>
                  <Grid item xs={10}>
                    <Typography gutterBottom variant="h6" component="div">
                      {item.TenVacXin}
                    </Typography>
                    <Typography variant="body2" color="text" my={1}>
                      Phòng bệnh: {item.MoTa}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Nguồn gốc: {item.TenNSX}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      mt={4}
                      color="primary"
                      textAlign="right"
                    >
                      {item.GiaTien.toLocaleString()} VNĐ
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    container
                    justifyContent="flex-end"
                    alignItems="flex-start"
                  >
                    <IconButton
                      onClick={() => handleDeleteVaccineCart(item.MaVacXin)}
                    >
                      <ClearOutlined />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
            </Box>
          ))}
          {cartGoiTiem?.map((item) => (
            <Box key={uuidv4()}>
              <CardContent>
                <Grid container>
                  <Grid item xs={10}>
                    <Typography gutterBottom variant="h6" component="div">
                      {item.TenGoiTiem}
                    </Typography>
                    <Typography variant="body2" color="text" my={1}>
                      Mô tả: {item.MoTa}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Danh sách vắc xin:{' '}
                      {item.DSVacXin?.map((item) => item.TenVacXin).join(
                        ', '
                      ) || 'Chưa có dữ liệu'}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      mt={4}
                      color="primary"
                      textAlign="right"
                    >
                      {item.TongTien.toLocaleString()} VNĐ
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    container
                    justifyContent="flex-end"
                    alignItems="flex-start"
                  >
                    <IconButton
                      onClick={() => handleDeleteGoiTiemCart(item.MaGoiTiem)}
                    >
                      <ClearOutlined />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
            </Box>
          ))}
        </>
      )}
      <CardContent>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TextField
              value={maKhachHang}
              onChange={(e) => setMaKhachHang(+e.target.value)}
              type="number"
              label="Mã khách hàng"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item>
            <LoadingButton
              loading={loadingButton}
              variant="contained"
              fullWidth
              color="warning"
              size="large"
              disabled={
                (cartVaccines.length === 0 && cartGoiTiem.length === 0) ||
                typeof khachHangOld === 'undefined' ||
                maKhachHang === 0
              }
              onClick={() => handleTaoPhieuDKDatMua()}
            >
              Đặt mua
            </LoadingButton>
          </Grid>
          <Grid item>
            <Divider />
          </Grid>
          <Grid item>
            <Link href="/injections/register">
              <Button
                variant="contained"
                fullWidth
                color="secondary"
                size="large"
                disabled={cartVaccines.length === 0 && cartGoiTiem.length === 0}
              >
                Đăng ký tiêm
              </Button>
            </Link>
          </Grid>
        </Grid>
      </CardContent>
      {typeof phieuDKDatMua !== 'undefined' && (
        <ModalThanhToanPhieuDK
          phieuDKTiem={phieuDKDatMua}
          dsGoiTiem={cartGoiTiem}
          dsVacXin={cartVaccines}
          isDatMua
        />
      )}
    </>
  )
}

export default Cart
