import { Box, CardContent, Divider, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { NhanVien } from '~/model'

interface Props {
  nhanVien: NhanVien
}
const NhanVienItem = ({ nhanVien }: Props) => {
  const router = useRouter()
  return (
    <CardContent>
      <Box onClick={() => router.push(`/staffs/${nhanVien.MaNhanVien}`)}>
        <Typography gutterBottom variant="h6" component="div">
          {nhanVien.TenNhanVien}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {nhanVien.BangCap}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {nhanVien.ChucVu}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {nhanVien.HeSoLuong}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Trung tâm: {nhanVien.MaTrungTam}
        </Typography>

        <Divider sx={{ my: 2 }} />
        <Typography variant="body1" color="text">
          Liên lạc:
        </Typography>
        <Typography
          variant="body2"
          color="text"
          mt={1}
          sx={{ overflow: 'hidden' }}
        >
          {nhanVien.SoDienThoai}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {nhanVien.Email}
        </Typography>
      </Box>
      {/* {action && <VaccineItemActions vaccine={vaccine} />} */}
    </CardContent>
  )
}

export default NhanVienItem
