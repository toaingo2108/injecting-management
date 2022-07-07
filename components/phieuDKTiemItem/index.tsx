import { Box, CardContent, Divider, Typography } from '@mui/material'
import { PhieuDKTiem } from '~/model'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'

interface Props {
  phieuDKTiem: PhieuDKTiem
  detail?: boolean
}

const PhieuDKTiemItem = ({ phieuDKTiem, detail }: Props) => {
  const router = useRouter()
  return (
    <CardContent>
      <Box onClick={() => router.push(`/sheets/${phieuDKTiem.MaPhieuDK}`)}>
        <Typography gutterBottom variant="h6" component="div">
          Mã phiếu: {phieuDKTiem.MaPhieuDK}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          Mã khách hàng: {phieuDKTiem.MaKhachHang}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Ngày lập: {dayjs(phieuDKTiem.NgayLap).format('DD-MM-YYYY')}
        </Typography>
        {detail && (
          <>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Kết quả khám sàn lọc: {phieuDKTiem.KetQuaKhamSL}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Trạng thái: {phieuDKTiem.TrangThai}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              STT {phieuDKTiem.STT}
            </Typography>
          </>
        )}
      </Box>
    </CardContent>
  )
}

export default PhieuDKTiemItem
