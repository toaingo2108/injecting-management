import { Box, CardContent, Divider, Grid, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { HoaDon } from '~/model'

interface Props {
  hoaDon: HoaDon
}

const HoaDonItem = ({ hoaDon }: Props) => {
  return (
    <>
      {hoaDon && (
        <CardContent>
          <Box>
            <Typography gutterBottom variant="h6" component="div" noWrap>
              Mã hoá đơn: {hoaDon.MaHoaDon}
            </Typography>

            <Typography variant="body1" color="text.primary">
              Lập bởi nhân viên: [{hoaDon.MaNhanVien}] vào ngày:{' '}
              {dayjs(hoaDon.NgayLap).format('DD-MM-YYYY')}
            </Typography>

            <Divider sx={{ my: 1 }} />

            <Typography variant="body1" color="text.primary">
              Thanh toán: {hoaDon.LoaiThanhToan ? 'Trực tiếp' : 'Online'}
            </Typography>
            <Typography variant="body1" color="text.primary">
              Ngày thanh toán:{' '}
              {dayjs(hoaDon.NgayThanhToan).format('DD-MM-YYYY')}
            </Typography>
            <Grid container justifyContent="flex-end">
              <Typography variant="h5" color="primary">
                {hoaDon.TongTien?.toLocaleString()} VNĐ
              </Typography>
            </Grid>
          </Box>
        </CardContent>
      )}
    </>
  )
}

export default HoaDonItem
