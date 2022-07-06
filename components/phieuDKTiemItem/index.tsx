import { Box, CardContent, Typography } from '@mui/material'
import { PhieuDKTiem } from '~/model'
import { useRouter } from 'next/router'

interface Props {
  phieuDKTiem: PhieuDKTiem
}

const PhieuDKTiemItem = ({ phieuDKTiem }: Props) => {
  const router = useRouter()
  return (
    <CardContent>
      <Box onClick={() => router.push(`/sheets/${phieuDKTiem.MaPhieuDK}`)}>
        <Typography gutterBottom variant="h6" component="div">
          Mã khách hàng: {phieuDKTiem.MaKhachHang}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Ngày lập: {phieuDKTiem.NgayLap}
        </Typography>
      </Box>
    </CardContent>
  )
}

export default PhieuDKTiemItem
