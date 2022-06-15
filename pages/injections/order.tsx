import { NextPage } from 'next'
import { Divider, Grid, Paper, Stack, Typography } from '@mui/material'
import { Vaccine } from '~/model'
import Layout from '~/components/layout'
import VaccineItem from '~/components/vaccineItem'

const vaccines: Vaccine[] = [
  {
    id: 1,
    name: 'VẮC XIN PHÒNG UNG THƯ CỔ TỬ CUNG GARDASIL',
    origin: 'MSD (USA)',
    price: '1.790.000',
    groups: ['Ung thư cổ tử cung'],
    prevention:
      'Ung thư cổ tử cung, âm hộ, âm đạo, các tổn thương tiền ung thư và loạn sản, mụn cóc sinh dục và bệnh lý do nhiễm virus HPV',
  },
  {
    id: 2,
    name: 'VẮC XIN PHÒNG UNG THƯ CỔ TỬ CUNG GARDASIL',
    origin: 'MSD (USA)',
    price: '1.790.000',
    groups: ['Ung thư cổ tử cung'],
    prevention:
      'Ung thư cổ tử cung, âm hộ, âm đạo, các tổn thương tiền ung thư và loạn sản, mụn cóc sinh dục và bệnh lý do nhiễm virus HPV',
  },
  {
    id: 3,
    name: 'VẮC XIN PHÒNG UNG THƯ CỔ TỬ CUNG GARDASIL',
    origin: 'MSD (USA)',
    price: '1.790.000',
    groups: ['Ung thư cổ tử cung'],
    prevention:
      'Ung thư cổ tử cung, âm hộ, âm đạo, các tổn thương tiền ung thư và loạn sản, mụn cóc sinh dục và bệnh lý do nhiễm virus HPV',
  },
  {
    id: 4,
    name: 'VẮC XIN PHÒNG UNG THƯ CỔ TỬ CUNG GARDASIL',
    origin: 'MSD (USA)',
    price: '1.790.000',
    groups: ['Ung thư cổ tử cung'],
    prevention:
      'Ung thư cổ tử cung, âm hộ, âm đạo, các tổn thương tiền ung thư và loạn sản, mụn cóc sinh dục và bệnh lý do nhiễm virus HPV',
  },
  {
    id: 5,
    name: 'VẮC XIN PHÒNG UNG THƯ CỔ TỬ CUNG GARDASIL',
    origin: 'MSD (USA)',
    price: '1.790.000',
    groups: ['Ung thư cổ tử cung'],
    prevention:
      'Ung thư cổ tử cung, âm hộ, âm đạo, các tổn thương tiền ung thư và loạn sản, mụn cóc sinh dục và bệnh lý do nhiễm virus HPV',
  },
  {
    id: 6,
    name: 'VẮC XIN PHÒNG UNG THƯ CỔ TỬ CUNG GARDASIL',
    origin: 'MSD (USA)',
    price: '1.790.000',
    groups: ['Ung thư cổ tử cung'],
    prevention:
      'Ung thư cổ tử cung, âm hộ, âm đạo, các tổn thương tiền ung thư và loạn sản, mụn cóc sinh dục và bệnh lý do nhiễm virus HPV',
  },
  {
    id: 7,
    name: 'VẮC XIN PHÒNG UNG THƯ CỔ TỬ CUNG GARDASIL',
    origin: 'MSD (USA)',
    price: '1.790.000',
    groups: ['Ung thư cổ tử cung'],
    prevention:
      'Ung thư cổ tử cung, âm hộ, âm đạo, các tổn thương tiền ung thư và loạn sản, mụn cóc sinh dục và bệnh lý do nhiễm virus HPV',
  },
  {
    id: 8,
    name: 'VẮC XIN PHÒNG UNG THƯ CỔ TỬ CUNG GARDASIL',
    origin: 'MSD (USA)',
    price: '1.790.000',
    groups: ['Ung thư cổ tử cung'],
    prevention:
      'Ung thư cổ tử cung, âm hộ, âm đạo, các tổn thương tiền ung thư và loạn sản, mụn cóc sinh dục và bệnh lý do nhiễm virus HPV',
  },
]

const Order: NextPage = () => {
  return (
    <Layout title="Đặt mua vắc xin" titlePage="Thông tin sản phẩm vắc xin">
      <Stack direction="row" spacing={6}>
        <Grid container spacing={{ xs: 1, md: 3 }}>
          {vaccines.map((vaccine) => (
            <Grid key={vaccine.id} item xs={12} md={4}>
              <Paper elevation={24}>
                <VaccineItem vaccine={vaccine} />
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Grid xs={4} container alignContent="flex-start" spacing={0}>
          <Paper elevation={24}>
            {vaccines.map((vaccine) => (
              <Grid item key={vaccine.id}>
                <Typography gutterBottom variant="h6" component="div">
                  {vaccine.name}
                </Typography>
                <Divider />
              </Grid>
            ))}
          </Paper>
        </Grid>
      </Stack>
    </Layout>
  )
}

export default Order
