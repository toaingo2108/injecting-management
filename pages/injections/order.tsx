// import { SyntheticEvent, useState } from 'react'
import { NextPage } from 'next'
import { SyntheticEvent, useState } from 'react'
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
  TextField,
  Typography,
} from '@mui/material'
import Layout from '~/components/layout'
import StepperComponent from '~/components/stepper'
import { useAppSelector } from '~/redux/hook'
import VaccineItem from '~/components/vaccineItem'
import { v4 as uuidv4 } from 'uuid'
import GoiTiemItem from '~/components/goiTiemItem'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import ThanhToanTheoDot from '~/components/thanhToanTheoDot'
import { totalPriceCart } from '~/src/utils'

const Order: NextPage = () => {
  const cartGoiTiem = useAppSelector((state) => state.cart.goiTiem)
  const cartVaccines = useAppSelector((state) => state.cart.vaccines)
  const totalPrice = totalPriceCart(cartVaccines, cartGoiTiem)

  const [tabValue, setTabValue] = useState('0')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
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
          ></Typography>
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
        <>
          <Grid container spacing={2}>
            <Grid item container spacing={2}>
              {cartVaccines?.map((vaccine) => (
                <Grid key={uuidv4()} item xs={12} md={6} lg={3}>
                  <Paper elevation={24} sx={{ borderRadius: 5 }}>
                    <VaccineItem vaccine={vaccine} />
                  </Paper>
                </Grid>
              ))}
            </Grid>
            <Grid item container spacing={2}>
              {cartGoiTiem?.map((goiTiem) => (
                <Grid key={uuidv4()} item xs={12} md={6} lg={3}>
                  <Paper elevation={24} sx={{ borderRadius: 5 }}>
                    <GoiTiemItem goiTiem={goiTiem} />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </>
      ),
    },
    {
      label: 'Bước 3',
      description: 'Chọn loại thanh toán',
      stepPage: (
        <TabContext value={tabValue}>
          <TabList onChange={handleChange}>
            <Tab label="Thanh toán toàn bộ" value="0" />
            <Tab
              label="Thanh toán theo đợt"
              value="1"
              disabled={totalPrice < 10000000}
            />
          </TabList>
          <TabPanel value="0">Thực hiện thanh toán toàn bộ</TabPanel>
          <TabPanel value="1">
            <ThanhToanTheoDot />
          </TabPanel>
        </TabContext>
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
    <Layout title="Đặt mua" titlePage="Đặt mua gói tiêm, vắc xin">
      <StepperComponent
        steps={steps}
        finalActionTitle="Xác nhận thanh toán"
        finalAction={() => console.log(123)}
      />
    </Layout>
  )
}

export default Order
