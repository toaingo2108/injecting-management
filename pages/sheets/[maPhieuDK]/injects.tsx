import {
  // Button,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { GetServerSideProps, NextPage } from 'next'
import Layout from '~/components/layout'
import { PhieuTiem } from '~/model'
import { apiUrl } from '~/src/constants'
import { v4 as uuidv4 } from 'uuid'
import ListEmpty from '~/components/listEmpty'
import { rowsPhieuTiem } from '~/src/utils'
import dayjs from 'dayjs'
import { useAppDispatch } from '~/redux/hook'
// import modalSlice from '~/components/modal/modalSlice'
// import ModalTaoPhieuTiem from '~/components/modalTaoPhieuTiem'
import { Edit } from '@mui/icons-material'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const maPhieuDK = ctx.params?.maPhieuDK
    const res = await fetch(`${apiUrl}/phieu-tiem/phieu-dk-tiem/${maPhieuDK}`)
    const data = await res.json()
    if (!data) {
      return {
        notFound: true,
      }
    }
    const dsPhieuTiem: PhieuTiem[] = data.dsPhieuTiem

    return {
      props: {
        dsPhieuTiem,
      },
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}

interface Props {
  dsPhieuTiem: PhieuTiem[]
}
const SheetInjects: NextPage<Props> = ({ dsPhieuTiem }) => {
  const dispatch = useAppDispatch()

  return (
    <Layout
      title={`Phiếu tiêm của phiếu đăng ký ${dsPhieuTiem[0]?.MaPhieuDK}`}
      titlePage={
        dsPhieuTiem[0]?.MaPhieuDK
          ? `Phiếu tiêm của phiếu đăng ký - Mã [${dsPhieuTiem[0]?.MaPhieuDK}]`
          : 'Chưa có phiếu tiêm'
      }
    >
      {dsPhieuTiem.length > 0 ? (
        <TableContainer
          component={Paper}
          sx={{ borderRadius: 5 }}
          elevation={6}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ whiteSpace: 'nowrap' }}>
                <TableCell>#</TableCell>
                <TableCell>Mã phiếu tiêm</TableCell>
                <TableCell>Mã nhân viên</TableCell>
                <TableCell>Ngày tiêm</TableCell>
                <TableCell>Kết quả khám</TableCell>
                <TableCell>Kết quả sau tiêm</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell align="center">STT</TableCell>
                <TableCell align="center">+</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rowsPhieuTiem(dsPhieuTiem).map((row, index) => (
                <TableRow key={uuidv4()}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.MaPhieuTiem}</TableCell>
                  <TableCell>{row.MaNhanVien}</TableCell>
                  <TableCell>
                    {dayjs(row.NgayTiem).format('DD-MM-YYYY')}
                  </TableCell>
                  <TableCell>{row.KetQuaKham}</TableCell>
                  <TableCell>{row.KetQuaSauTiem}</TableCell>
                  <TableCell>{row.TrangThai}</TableCell>
                  <TableCell align="center">{row.STT}</TableCell>
                  <TableCell align="center">
                    <IconButton size="small">
                      <Edit />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Grid container justifyContent="center" alignItems="center">
          <ListEmpty />
        </Grid>
      )}
      {/* <Grid container justifyContent="center" mt={6}>
        <Button
          variant="contained"
          onClick={() => dispatch(modalSlice.actions.openModal())}
        >
          Tạo phiếu tiêm
        </Button>
      </Grid>
      <ModalTaoPhieuTiem /> */}
    </Layout>
  )
}

export default SheetInjects
