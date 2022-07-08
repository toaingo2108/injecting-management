const express = require('express')
const router = express.Router()
const sql = require('mssql')
const config = require('../config')

router.post('/', async (req, res) => {
  const { TenNguoiGiamHo, MaKhachHang, MaPhieuDK, SoDienThoai, MoiQuanHe } =
    req.body
  try {
    let pool = await sql.connect(config)
    const { recordset, output } = await pool.query(
      `insert into NguoiGiamHo (TenNguoiGiamHo, MaKhachHang, MaPhieuDK, SoDienThoai, MoiQuanHe)
        output inserted.*
        values (N'${TenNguoiGiamHo}', ${MaKhachHang}, ${MaPhieuDK}, '${SoDienThoai}', N'${MoiQuanHe}')`
    )
    if (output.error) {
      return res.status(400).json({
        success: false,
        message: output.error,
      })
    }

    res.json({
      success: true,
      nguoiGiamHo: recordset[0],
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
      `select * from NguoiGiamHo where MaPhieuDK = ${req.params.MaPhieuDK}`
    )
    if (output.error) {
      return res.status(400).json({
        success: false,
        message: output.error,
      })
    }

    res.json({
      success: true,
      nguoiGiamHo: recordset[0],
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
