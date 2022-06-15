import {
  Button,
  CardActionArea,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from '@mui/material'
import { Check, SellOutlined } from '@mui/icons-material'
import { Vaccine } from '~/model'
import { useAppDispatch, useAppSelector } from '~/redux/hook'
import cartVaccinesSlice from '../cartVaccines/cartVaccinesSlice'

interface Props {
  vaccine: Vaccine
}

const VaccineItem = ({ vaccine }: Props) => {
  const cartVaccines = useAppSelector((state) => state.cartVaccines.vaccines)
  const selected = !!cartVaccines.find((item) => item.id === vaccine.id)

  const dispatch = useAppDispatch()

  const handleAddToCart = (vaccine: Vaccine) => {
    dispatch(cartVaccinesSlice.actions.addVaccineIntoCart(vaccine))
  }

  const handleRemoveFromCart = (id: string) => {
    dispatch(cartVaccinesSlice.actions.removeVaccineFromCart(id))
  }

  return (
    <>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {vaccine.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {vaccine.origin}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {vaccine.groups.join(', ')}
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            mt={4}
            color="primary"
            fontWeight="bold"
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <SellOutlined sx={{ marginRight: 1 }} />
            {vaccine.price} VNĐ
          </Typography>
          <Divider />
          <Typography variant="body1" color="text" mt={2}>
            Phòng bệnh:
          </Typography>
          <Typography variant="body2" color="text" mt={1}>
            {vaccine.prevention}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {selected ? (
          <Button
            size="large"
            fullWidth
            color="success"
            variant="contained"
            onClick={() => handleRemoveFromCart(vaccine.id)}
          >
            Đã chọn
            <Check sx={{ ml: 1 }} />
          </Button>
        ) : (
          <Button
            size="large"
            fullWidth
            color="primary"
            variant="contained"
            onClick={() => handleAddToCart(vaccine)}
          >
            Chọn
          </Button>
        )}
      </CardActions>
    </>
  )
}

export default VaccineItem
