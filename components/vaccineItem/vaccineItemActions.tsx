import { useAppDispatch, useAppSelector } from '~/redux/hook'
import cartVaccinesSlice from '~/components/cartVaccines/cartVaccinesSlice'
import { Check } from '@mui/icons-material'
import { Vaccine } from '~/model'
import { Box, Button } from '@mui/material'

interface Props {
  vaccine: Vaccine
}

const VaccineItemActions = ({ vaccine }: Props) => {
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
    <Box mt={2}>
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
    </Box>
  )
}

export default VaccineItemActions
