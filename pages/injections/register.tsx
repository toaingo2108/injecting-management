import { NextPage } from 'next'
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import Layout from '~/components/layout'
import StepperComponent from '~/components/stepper'
// import { useState } from 'react'

const Register: NextPage = () => {
  // const [isCustomer, setIsCustomer] = useState(false)

  const steps = [
    {
      label: 'Bước 1',
      description: 'Thông tin người được tiêm',
      stepPage: <Box>a</Box>,
    },
    {
      label: 'Bước 2',
      description: 'Thanh toán',
      stepPage: <Box>a</Box>,
    },
    {
      label: 'Bước 3',
      description: 'Xác nhận',
      stepPage: <Box>a</Box>,
    },
  ]

  return (
    <Layout title="Đăng ký vắc xin" titlePage="Đăng ký mũi tiêm">
      <StepperComponent steps={steps} />
      <FormControl>
        <RadioGroup defaultValue="isCustomer">
          <FormControlLabel
            value="isCustomer"
            control={<Radio />}
            label="Quý khách là Thành viên khách hàng thân thiết"
          />
          <FormControlLabel
            value="notCustomer"
            control={<Radio />}
            label="Quý khách chưa là Thành viên khách hàng thân thiết"
          />
        </RadioGroup>
      </FormControl>
      <Typography
        variant="h5"
        component="div"
        textTransform="uppercase"
        color="primary"
        fontWeight="400"
      >
        Đăng nhập thành viên khách hàng thân thiết
      </Typography>
      <Autocomplete
        freeSolo
        options={[]}
        sx={{ my: 2 }}
        renderInput={(params) => (
          <>
            <TextField
              {...params}
              size="small"
              label="Nhập mã thẻ thành viên của quý khách"
            />
          </>
        )}
      />
      <Button variant="outlined" color="primary">
        Tiếp tục
      </Button>
    </Layout>
  )
}

export default Register
