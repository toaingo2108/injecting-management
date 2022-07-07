const express = require('express')
const router = express.Router()
const sql = require('mssql')
const config = require('../config')

router.post('/', async (req, res) => {
  const { TenKhachHang, NgaySinh, SoDienThoai, SoTaiKhoan, DiaChi, GioiTinh } =
    req.body
  try {
    let pool = await sql.connect(config)
    const { recordset, output } = await pool.query(
      `insert into KhachHang (TenKhachHang, NgaySinh, SoDienThoai, SoTaiKhoan, DiaChi, GioiTinh)
        output inserted.*
        values (N'${TenKhachHang}', '${NgaySinh}', '${SoDienThoai}', '${SoTaiKhoan}', N'${DiaChi}', ${GioiTinh})`
    )
    if (output.error) {
      return res.status(400).json({
        success: false,
        message: output.error,
      })
    }

    res.json({
      success: true,
      khachHang: recordset[0],
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      message: 'Lỗi hệ thống',
    })
  }
})

router.get('/:MaKhachHang', async (req, res) => {
  try {
    let pool = await sql.connect(config)
    const { recordset, output } = await pool.query(
      `select * from KhachHang where MaKhachHang = ${req.params.MaKhachHang}`
    )
    if (output.error) {
      return res.status(400).json({
        success: false,
        message: output.error,
      })
    }

    res.json({
      success: true,
      khachHang: recordset[0],
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
