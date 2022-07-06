import { useAppDispatch, useAppSelector } from '~/redux/hook'
import {
  Box,
  Button,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@mui/material'
import { BallotOutlined, ClearOutlined } from '@mui/icons-material'
import cartSlice from '~/components/cart/cartSlice'
import vaccineImage from '~/public/img/vaccine.png'
import Image from 'next/image'
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid'

const Cart = () => {
  const cartVaccines = useAppSelector((state) => state.cart.vaccines)
  const cartGoiTiem = useAppSelector((state) => state.cart.goiTiem)
  const dispatch = useAppDispatch()

  const handleDeleteVaccineCart = (MaVacXin: number) => {
    dispatch(cartSlice.actions.removeVaccineFromCart(MaVacXin))
  }
  const handleDeleteGoiTiemCart = (MaGoiTiem: number) => {
    dispatch(cartSlice.actions.removeGoiTiemFromCart(MaGoiTiem))
  }

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
          <Grid container justifyContent="center" alignItems="center">
            <Image src={vaccineImage} alt="empty" width={100} height={100} />
          </Grid>
          <Typography
            variant="h5"
            color="text.secondary"
            textAlign="center"
            mt={2}
          >
            DANH SÁCH TRỐNG
          </Typography>
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
            <Link href="/injections/order">
              <Button
                variant="contained"
                fullWidth
                color="warning"
                size="large"
                disabled={cartVaccines.length === 0 && cartGoiTiem.length === 0}
              >
                Tới trang đặt mua
              </Button>
            </Link>
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
    </>
  )
}

export default Cart
