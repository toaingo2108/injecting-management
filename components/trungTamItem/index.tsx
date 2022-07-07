import { Box, CardContent, Divider, Typography } from '@mui/material'
import { TrungTam } from '~/model'
import { useRouter } from 'next/router'

interface Props {
  trungTam: TrungTam
}

const TrungTamItem = ({ trungTam }: Props) => {
  const router = useRouter()
  return (
    <CardContent>
      <Box onClick={() => router.push(`/centers/${trungTam.MaTrungTam}`)}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          noWrap
          overflow="hiden"
        >
          {trungTam.TenTrungTam}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Mã {trungTam.MaTrungTam}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          overflow="hiden"
          height={50}
        >
          {trungTam.DiaChi}
        </Typography>

        <Divider />
        <Typography variant="body1" color="text" mt={2}>
          Liên lạc: {trungTam.SoDienThoai}
        </Typography>
      </Box>
    </CardContent>
  )
}

export default TrungTamItem
