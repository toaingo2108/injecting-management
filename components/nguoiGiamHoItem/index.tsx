import { Box, CardContent, Divider, Typography } from '@mui/material'
import { NguoiGiamHo } from '~/model'

interface Props {
  nguoiGiamHo: NguoiGiamHo
}

const NguoiGiamHoItem = ({ nguoiGiamHo }: Props) => {
  return (
    <CardContent>
      <Box>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          noWrap
          overflow="hidden"
        >
          {nguoiGiamHo.TenNguoiGiamHo}
        </Typography>
        <Typography variant="body2" color="text.primary">
          Mối quan hệ: {nguoiGiamHo.MoiQuanHe}
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Typography variant="h6" color="text.secondary">
          Liên lạc:{nguoiGiamHo.SoDienThoai}
        </Typography>
      </Box>
    </CardContent>
  )
}

export default NguoiGiamHoItem
