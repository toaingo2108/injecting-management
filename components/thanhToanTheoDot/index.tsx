import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from '@mui/material'
import React from 'react'

const ThanhToanTheoDot = () => {
  const [combo, setCombo] = React.useState(3)

  const handleChangeCombo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCombo(+(event.target as HTMLInputElement).value)
  }
  console.log(combo)
  return (
    <Grid container spacing={4} mt={2}>
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">
          Lựa chọn các gói đợt thanh toán theo đợt
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={combo}
          onChange={handleChangeCombo}
        >
          <FormControlLabel value={3} control={<Radio />} label="3 tháng" />
          <FormControlLabel value={6} control={<Radio />} label="6 tháng" />
        </RadioGroup>
      </FormControl>
    </Grid>
  )
}

export default ThanhToanTheoDot
