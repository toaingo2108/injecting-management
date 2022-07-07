import { Box, CardContent, Divider, Typography } from '@mui/material'
import { SellOutlined } from '@mui/icons-material'
import { VacXin } from '~/model'
import VaccineItemActions from '~/components/vaccineItem/vaccineItemActions'
import { useRouter } from 'next/router'

interface Props {
  vaccine: VacXin
  action?: boolean
}

const VaccineItem = ({ vaccine, action }: Props) => {
  const router = useRouter()
  return (
    <CardContent>
      <Box onClick={() => router.push(`/vaccines/${vaccine.MaVacXin}`)}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          noWrap
          overflow="hiden"
        >
          {vaccine.TenVacXin}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {vaccine.TenNSX}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          overflow="hiden"
          height={50}
        >
          {vaccine.MoTa}
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
          {vaccine.GiaTien?.toLocaleString() || 0} VNĐ
        </Typography>
        <Divider />
        <Typography variant="body1" color="text" mt={2}>
          Phòng bệnh:
        </Typography>
        <Typography variant="body2" color="text" mt={1} mb={4} height={50}>
          {vaccine.MoTa}
        </Typography>
      </Box>
      {action && <VaccineItemActions vaccine={vaccine} />}
    </CardContent>
  )
}

export default VaccineItem
