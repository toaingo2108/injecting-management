import { Box, CardContent, Divider, Typography } from '@mui/material'
import { KhachHang } from '~/model'
// import { useRouter } from 'next/router'
import dayjs from 'dayjs'

interface Props {
  khachHang: KhachHang
}

const KhachHangItem = ({ khachHang }: Props) => {
  //   const router = useRouter()
  return (
    <CardContent>
      <Box
      //   onClick={() => router.push(`/customers/${khachHang.MaKhachHang}`)}
      >
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          noWrap
          overflow="hidden"
        >
          {khachHang.TenKhachHang}
        </Typography>
        <Typography variant="body2" color="text.primary">
          Giới tính: {khachHang.GioiTinh ? 'Nam' : 'Nữ'}
        </Typography>
        <Typography variant="body2" color="text.primary">
          {dayjs(khachHang.NgaySinh).format('DD-MM-YYYY')}
        </Typography>

        <Typography variant="body2" color="text.secondary" height={50}>
          Địa chỉ: {khachHang.DiaChi}
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Typography variant="h6" color="text.secondary">
          Liên lạc:{khachHang.SoDienThoai}
        </Typography>
      </Box>
    </CardContent>
  )
}

export default KhachHangItem
