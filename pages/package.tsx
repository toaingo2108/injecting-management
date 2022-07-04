import React from 'react'
import { NextPage } from 'next'
import {
  Box,
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
import { danhSachGoiTiem } from '~/data/goiTiem'
import { v4 as uuidv4 } from 'uuid'
import { GoiTiem } from '~/model'

const rows = (goiTiem: GoiTiem) => {
  return goiTiem.DSVacXin.map((vacxin, index) => ({
    id: index + 1,
    prevention: vacxin.VacXin.prevention,
    name: vacxin.VacXin.name,
    origin: vacxin.VacXin.origin,
    soLuong: vacxin.SoLuong,
  }))
}

const tongSoLieu = (goiTiem: GoiTiem) => {
  let total = 0
  for (let item of goiTiem.DSVacXin) {
    total = total + item.SoLuong
  }
  return total
}

const Package: NextPage = () => {
  return (
    <Layout title="Danh sách gói tiêm" titlePage="Danh mục gói vắc xin">
      {danhSachGoiTiem.map((goiTiem, index) => (
        <Box key={uuidv4()} mt={6}>
          <Typography variant="h5" color="primary" my={2} align="center">
            {index + 1}.{goiTiem.MoTa}
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ whiteSpace: 'nowrap' }}>
                  <TableCell align="center">STT</TableCell>
                  <TableCell align="center">Phòng bệnh</TableCell>
                  <TableCell align="center">Tên vắc xin</TableCell>
                  <TableCell align="center">Nước sản xuất</TableCell>
                  <TableCell align="center">Số lượng</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows(danhSachGoiTiem[0]).map((row, index) => (
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
                  <TableCell align="center">{tongSoLieu(goiTiem)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    Giá gói
                  </TableCell>
                  <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>
                    {goiTiem.TongTien.toLocaleString()} VNĐ
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ))}
    </Layout>
  )
}

export default Package
