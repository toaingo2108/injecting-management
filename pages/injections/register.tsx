import { SyntheticEvent, useState } from 'react'
import { NextPage } from 'next'
import {
  Autocomplete,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import Layout from '~/components/layout'
import StepperComponent from '~/components/stepper'
import { useAppSelector } from '~/redux/hook'
import VaccineItem from '~/components/vaccineItem'
import { Vaccine } from '~/model'

function totalPriceVaccines(cartVaccines: Vaccine[]) {
  let total = 0
  for (let vaccine of cartVaccines) {
    total += vaccine.price
  }
  return total
}

const Register: NextPage = () => {
  const cartVaccines = useAppSelector((state) => state.cartVaccines.vaccines)
  const totalPrice = totalPriceVaccines(cartVaccines)
  // const [isCustomer, setIsCustomer] = useState(false)

  const [tabValue, setTabValue] = useState(2)

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const steps = [
    {
      label: 'Bước 1',
      description: 'Thông tin người được tiêm',
      stepPage: (
        <>
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
        </>
      ),
    },
    {
      label: 'Bước 2',
      description: 'Xác nhận Gói tiêm, Vắc xin',
      stepPage: (
        <Grid container spacing={2} justifyContent="flex-end">
          {cartVaccines?.map((vaccine) => (
            <Grid key={vaccine.id} item xs={12} md={6} lg={3}>
              <Paper elevation={24} sx={{ borderRadius: 5 }}>
                <VaccineItem vaccine={vaccine} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      ),
    },
    {
      label: 'Bước 3',
      description: 'Chọn loại thanh toán',
      stepPage: (
        <>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="disabled tabs example"
          >
            <Tab label="Thanh toán toàn bộ" />
            <Tab label="Thanh toán theo đợt" disabled={totalPrice < 10000000} />
          </Tabs>
        </>
      ),
    },
    {
      label: 'Bước 4',
      description: 'Chọn loại thanh toán',
      stepPage: (
        <Stack direction="row" spacing={2}>
          <Button variant="contained">Thanh toán toàn bộ</Button>
          <Button variant="contained" disabled={totalPrice < 10000000}>
            Thanh toán theo đợt
          </Button>
        </Stack>
      ),
    },
  ]

  return (
    <Layout title="Đăng ký vắc xin" titlePage="Đăng ký mũi tiêm">
      <StepperComponent steps={steps} />
    </Layout>
  )
}

export default Register
