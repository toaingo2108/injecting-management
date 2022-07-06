import { Box, CardContent, Divider, Typography } from '@mui/material'
import { LichLamViec } from '~/model'
import LichLamViecItemActions from '~/components/lichLamViecItem/lichLamViecItemActions'
import dayjs from 'dayjs'

interface Props {
  lichLamViec: LichLamViec
  action?: boolean
}

const LichLamViecItem = ({ lichLamViec, action }: Props) => {
  return (
    <CardContent>
      <Box>
        <Typography gutterBottom variant="h6" component="div">
          Mã lịch: {lichLamViec.MaLich}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Ngày: {dayjs(lichLamViec.Ngay).format('DD-MM-YYYY')}
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
