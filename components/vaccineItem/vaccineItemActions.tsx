import { useAppDispatch, useAppSelector } from '~/redux/hook'
import cartSlice from '~/components/cart/cartSlice'
import { Check } from '@mui/icons-material'
import { VacXin } from '~/model'
import { Box, Button } from '@mui/material'

interface Props {
  vaccine: VacXin
}

const VaccineItemActions = ({ vaccine }: Props) => {
  const cartVaccines = useAppSelector((state) => state.cart.vaccines)
  const selected = !!cartVaccines.find(
    (item) => item.MaVacXin === vaccine.MaVacXin
  )

  const dispatch = useAppDispatch()

  const handleAddToCart = (vaccine: VacXin) => {
    dispatch(cartSlice.actions.addVaccineIntoCart(vaccine))
  }

  const handleRemoveFromCart = (MaVacXin: number) => {
    dispatch(cartSlice.actions.removeVaccineFromCart(MaVacXin))
  }
  return (
    <Box mt={2}>
      {selected ? (
        <Button
          size="large"
          fullWidth
          color="success"
          variant="contained"
          onClick={() => handleRemoveFromCart(vaccine.MaVacXin)}
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
    </Box>
  )
}

export default VaccineItemActions
