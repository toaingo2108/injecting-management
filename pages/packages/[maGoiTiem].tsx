import { GetServerSideProps, NextPage } from 'next'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import Layout from '~/components/layout'
import { GoiTiem } from '~/model'
import { v4 as uuidv4 } from 'uuid'
import { rowsGoiTiem, tongSoLieuGoiTiem } from '~/src/utils'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const maGoiTiem = ctx.params?.maGoiTiem
  const res = await fetch(`http://localhost:5000/api/goi-tiem/${maGoiTiem}`)
  const data = await res.json()
  if (!data) {
    return {
      notFound: true,
    }
  }
  const goiTiem: GoiTiem = data.goiTiem
  return { props: { goiTiem } }
}

interface Props {
  goiTiem: GoiTiem
}

const GoiTiemDetail: NextPage<Props> = ({ goiTiem }) => {
  return (
    <Layout
      title={`Thông tin gói tiêm: ${goiTiem.TenGoiTiem}`}
      titlePage={`Thông tin gói tiêm: ${goiTiem.TenGoiTiem}`}
    >
      <TableContainer component={Paper} sx={{ borderRadius: 5 }} elevation={12}>
        <Table>
          <TableHead>
            <TableRow sx={{ whiteSpace: 'nowrap' }}>
              <TableCell align="center">STT</TableCell>
              <TableCell align="center">Phòng bệnh</TableCell>
              <TableCell align="center">Tên vắc xin</TableCell>
              <TableCell align="center">Nhà sản xuất</TableCell>
              <TableCell align="center">Số lượng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsGoiTiem(goiTiem).map((row, index) => (
              <TableRow key={uuidv4()}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{row.prevention}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.origin}</TableCell>
                <TableCell align="center">{row.soLuong}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4} align="center">
                Tổng số liều
              </TableCell>
              <TableCell align="center">{tongSoLieuGoiTiem(goiTiem)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4} align="center">
                Giá gói
              </TableCell>
              <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>
                <Typography color="primary" fontWeight="bold">
                  {goiTiem.TongTien.toLocaleString()} VNĐ
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  )
}

export default GoiTiemDetail
