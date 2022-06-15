import { useState } from 'react'
import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@mui/material'
import { Vaccine } from '~/model'
import { BallotOutlined, ClearOutlined } from '@mui/icons-material'
import { vaccines } from '~/data'

const CartVaccines = () => {
  const [cartVaccines, setCartVaccines] = useState<Vaccine[]>(vaccines)

  const handleDeleteVaccineCart = (id: string) => {
    setCartVaccines([...cartVaccines.filter((item) => item.id !== id)])
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
      {cartVaccines ? (
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
        <CardMedia
          component="img"
          height="140"
          image="~/public/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
      )}
      <CardActions>
        <Button variant="contained" fullWidth size="large" disabled>
          Đăng ký mũi tiêm
        </Button>
      </CardActions>
    </>
  )
}

export default CartVaccines
