import {
  Button,
  CardActionArea,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from '@mui/material'
import { SellOutlined } from '@mui/icons-material'
import { Vaccine } from '~/model'
interface Props {
  vaccine: Vaccine
}

const VaccineItem = ({ vaccine }: Props) => {
  return (
    <>
      <CardActionArea>
        <CardContent>
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
            {vaccine.price} VNĐ
          </Typography>
          <Divider />
          <Typography variant="body1" color="text" mt={2}>
            Phòng bệnh:
          </Typography>
          <Typography variant="body2" color="text" mt={1}>
            {vaccine.prevention}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="large" fullWidth color="primary" variant="contained">
          Chọn
        </Button>
      </CardActions>
    </>
  )
}

export default VaccineItem
