const express = require('express')
const router = express.Router()
const sql = require('mssql')
const config = require('../config')

router.post('/', async (req, res) => {
  const {
    MaPhieuDK,
    MaGoiTiem,
    MaVacXin,
    MaTrungTam,
    MaPhieuTiem,
    NgayTiem,
    SoLuong,
    TinhTrang,
    GhiChu,
  } = req.body
  try {
    let pool = await sql.connect(config)
    const { recordset, output } = await pool.query(
      `insert into ChiTietPhieuDangKy (MaPhieuDK, MaGoiTiem, MaVacXin, MaTrungTam, MaPhieuTiem, NgayTiem, SoLuong, TinhTrang, GhiChu)
        output inserted.*
        values (${MaPhieuDK}, ${MaGoiTiem}, ${MaVacXin}, ${MaTrungTam}, ${MaPhieuTiem}, '${NgayTiem}', ${SoLuong}, N'${TinhTrang}', N'${GhiChu}')`
    )
    if (output.error) {
      return res.status(400).json({
        success: false,
        message: output.error,
      })
    }

    res.json({
      success: true,
      chiTietPhieuDK: recordset[0],
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      message: 'Lỗi hệ thống',
    })
  }
})

router.get('/phieu-dk-tiem/:MaPhieuDK', async (req, res) => {
  try {
    let pool = await sql.connect(config)
    const { recordset, output } = await pool.query(
      `select * from ChiTietPhieuDangKy where MaPhieuDK = ${req.params.MaPhieuDK}`
    )
    if (output.error) {
      return res.status(400).json({
        success: false,
        message: output.error,
      })
    }
    res.json({
      success: true,
      dsChiTietPhieuDKTiem: recordset,
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      message: 'Lỗi hệ thống',
    })
  }
})

module.exports = router
