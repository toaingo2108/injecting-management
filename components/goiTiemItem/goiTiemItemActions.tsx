import { useAppDispatch, useAppSelector } from '~/redux/hook'
import cartSlice from '~/components/cart/cartSlice'
import { Check } from '@mui/icons-material'
import { GoiTiem } from '~/model'
import { Box, Button } from '@mui/material'

interface Props {
  goiTiem: GoiTiem
}
const GoiTiemItemActions = ({ goiTiem }: Props) => {
  const cartGoiTiem = useAppSelector((state) => state.cart.goiTiem)
  const selected = !!cartGoiTiem.find(
    (item) => item.MaGoiTiem === goiTiem.MaGoiTiem
  )

  const dispatch = useAppDispatch()

  const handleAddToCart = (goiTiem: GoiTiem) => {
    dispatch(cartSlice.actions.addGoiTiemIntoCart(goiTiem))
  }

  const handleRemoveFromCart = (MaGoiTiem: number) => {
    dispatch(cartSlice.actions.removeGoiTiemFromCart(MaGoiTiem))
  }
  return (
    <Box mt={2}>
      {selected ? (
        <Button
          size="large"
          fullWidth
          color="success"
          variant="contained"
          onClick={() => handleRemoveFromCart(goiTiem.MaGoiTiem)}
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
          onClick={() => handleAddToCart(goiTiem)}
        >
          Chọn
        </Button>
      )}
    </Box>
  )
}

export default GoiTiemItemActions
