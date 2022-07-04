import { Box, CardContent, Divider, Typography } from '@mui/material'
import { SellOutlined } from '@mui/icons-material'
import { Vaccine } from '~/model'
import VaccineItemActions from './vaccineItemActions'
import { useRouter } from 'next/router'

interface Props {
  vaccine: Vaccine
  action?: boolean
}

const VaccineItem = ({ vaccine, action }: Props) => {
  const router = useRouter()
  return (
    <CardContent>
      <Box onClick={() => router.push(`/vaccines/${vaccine.id}`)}>
        <Typography gutterBottom variant="h6" component="div">
          {vaccine.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {vaccine.origin}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {vaccine.groups.join(', ')}
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
          {vaccine.price.toLocaleString()} VNĐ
        </Typography>
        <Divider />
        <Typography variant="body1" color="text" mt={2}>
          Phòng bệnh:
        </Typography>
        <Typography
          variant="body2"
          color="text"
          mt={1}
          sx={{ height: 50, overflow: 'hidden' }}
        >
          {vaccine.prevention}
        </Typography>
      </Box>
      {action && <VaccineItemActions vaccine={vaccine} />}
    </CardContent>
  )
}

export default VaccineItem
