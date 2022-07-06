import { Box, CardContent, Divider, Typography } from '@mui/material'
import { LichLamViec } from '~/model'
import LichLamViecItemActions from '~/components/lichLamViecItem/lichLamViecItemActions'

interface Props {
  lichLamViec: LichLamViec
  action?: boolean
}

const LichLamViecItem = ({ lichLamViec, action }: Props) => {
  const date = new Date(lichLamViec.Ngay)
  const ngayLamViec = `${
    date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  }-${
    date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()
  }-${date.getFullYear()}`
  return (
    <CardContent>
      <Box>
        <Typography gutterBottom variant="h6" component="div">
          Mã lịch: {lichLamViec.MaLich}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Ngày: {ngayLamViec}
        </Typography>

        <Divider />
        <Typography variant="h5" color="text" mt={2}>
          Ca làm việc: {lichLamViec.Ca}
        </Typography>
      </Box>
      {action && <LichLamViecItemActions lichLamViec={lichLamViec} />}
    </CardContent>
  )
}

export default LichLamViecItem
