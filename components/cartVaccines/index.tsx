import { useAppDispatch, useAppSelector } from '~/redux/hook'
import {
  Button,
  CardActions,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@mui/material'
import { BallotOutlined, ClearOutlined } from '@mui/icons-material'
import cartVaccinesSlice from './cartVaccinesSlice'
import vaccineImage from '~/public/img/vaccine.png'
import Image from 'next/image'

const CartVaccines = () => {
  const cartVaccines = useAppSelector((state) => state.cartVaccines.vaccines)
  const dispatch = useAppDispatch()

  const handleDeleteVaccineCart = (id: string) => {
    dispatch(cartVaccinesSlice.actions.removeVaccineFromCart(id))
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
            Danh sách vắc xin chọn mua
          </Grid>
        </Typography>
      </CardContent>
      <Divider />
      {cartVaccines.length > 0 ? (
        cartVaccines.map((item, index) => (
          <div key={index}>
            <CardContent>
              <Grid container>
                <Grid item xs={10}>
                  <Typography gutterBottom variant="h6" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text" my={1}>
                    Phòng bệnh: {item.prevention}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Nguồn gốc: {item.origin}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    mt={4}
                    color="primary"
                    textAlign="right"
                  >
                    {item.price} VNĐ
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={2}
                  container
                  justifyContent="flex-end"
                  alignItems="flex-start"
                >
                  <IconButton onClick={() => handleDeleteVaccineCart(item.id)}>
                    <ClearOutlined />
                  </IconButton>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
          </div>
        ))
      ) : (
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
      )}
      <CardActions>
        <Button
          variant="contained"
          fullWidth
          size="large"
          disabled={cartVaccines.length === 0}
        >
          Đăng ký mũi tiêm
        </Button>
      </CardActions>
    </>
  )
}

export default CartVaccines
