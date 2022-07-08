const express = require('express')
const router = express.Router()
const sql = require('mssql')
const config = require('../config')

router.get('/phieu-dk-tiem/:MaPhieuDK', async (req, res) => {
  try {
    let pool = await sql.connect(config)
    const { recordset, output } = await pool.query(
      `select * from HoaDon where MaPhieuDK = ${req.params.MaPhieuDK}`
    )
    if (output.error) {
      return res.status(400).json({
        success: false,
        message: output.error,
      })
    }
    res.json({
      success: true,
      hoaDon: recordset[0],
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      message: 'Lỗi hệ thống',
    })
  }
})

router.post('/', async (req, res) => {
  const {
    MaNhanVien,
    MaPhieuDK,
    NgayLap,
    NgayThanhToan,
    LoaiThanhToan,
    TongTien,
  } = req.body
  try {
    let pool = await sql.connect(config)
    const { recordset, output } = await pool.query(
      `insert into HoaDon (MaNhanVien, MaPhieuDK, NgayLap, NgayThanhToan, LoaiThanhToan, TongTien) 
      output inserted.*
      values (${MaNhanVien}, ${MaPhieuDK}, '${NgayLap}', '${NgayThanhToan}', ${LoaiThanhToan}, ${TongTien})`
    )
    if (output.error) {
      return res.status(400).json({
        success: false,
        message: output.error,
      })
    }

    res.json({
      success: true,
      hoaDon: recordset[0],
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
