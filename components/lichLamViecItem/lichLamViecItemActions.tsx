import { LichLamViec } from '~/model'
import { Box, Button } from '@mui/material'
import { useRouter } from 'next/router'

interface Props {
  lichLamViec: LichLamViec
}

const LichLamViecItemActions = ({ lichLamViec }: Props) => {
  const router = useRouter()
  return (
    <>
      <Box mt={2}>
        <Button
          size="small"
          fullWidth
          color="primary"
          variant="contained"
          onClick={() => router.push(`/schedule/${lichLamViec.MaLich}`)}
        >
          Xem nhân viên đăng ký
        </Button>
      </Box>
    </>
  )
}

export default LichLamViecItemActions
