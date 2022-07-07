const express = require('express')
const router = express.Router()
const sql = require('mssql')
const config = require('../config')

router.post('/', async (req, res) => {
  const { MaPhieuDK, MaGoiTiem, SoLuong, TinhTrang } = req.body
  try {
    let pool = await sql.connect(config)
    const { recordset, output } = await pool.query(
      `insert into PhieuDangKyTiem_GoiTiem (MaPhieuDK, MaGoiTiem, SoLuong, TinhTrang)
        output inserted.*
        values (${MaPhieuDK}, ${MaGoiTiem}, ${SoLuong}, N'${TinhTrang}')`
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

module.exports = router
