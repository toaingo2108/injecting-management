import { Box, CardContent, Divider, Typography } from '@mui/material'
import { SellOutlined } from '@mui/icons-material'
import { GoiTiem } from '~/model'
import { useRouter } from 'next/router'
import GoiTiemItemActions from '~/components/goiTiemItem/goiTiemItemActions'

interface Props {
  goiTiem: GoiTiem
  action?: boolean
}

const GoiTiemItem = ({ goiTiem, action }: Props) => {
  const router = useRouter()
  return (
    <CardContent>
      <Box onClick={() => router.push(`/packages/${goiTiem.MaGoiTiem}`)}>
        <Typography gutterBottom variant="h6" component="div">
          {goiTiem.TenGoiTiem}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {goiTiem.MoTa}
        </Typography>

        <Typography
          gutterBottom
          variant="h5"
          component="div"
          mt={4}
          color="primary"
          fontWeight="bold"
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <SellOutlined sx={{ marginRight: 1 }} />
          {goiTiem.TongTien?.toLocaleString() || 0} VNĐ
        </Typography>
        <Divider />
        <Typography variant="body1" color="text" mt={2}>
          Danh sách vắc xin:
        </Typography>
        <Typography
          variant="body2"
          color="text"
          mt={1}
          sx={{ height: 50, overflow: 'hidden' }}
        >
          {goiTiem.DSVacXin?.map((vacXin) => vacXin.TenVacXin).join(', ') ||
            'Chưa có dữ liệu'}
        </Typography>
      </Box>
      {action && <GoiTiemItemActions goiTiem={goiTiem} />}
    </CardContent>
  )
}

export default GoiTiemItem
