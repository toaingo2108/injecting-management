const express = require('express')
const router = express.Router()
const sql = require('mssql')
const config = require('../config')

router.get('/:MaNhanVien', async (req, res) => {
  try {
    let pool = await sql.connect(config)
    const { recordset, output } = await pool.query(
      `select * from NhanVien where MaNhanVien = ${req.params.MaNhanVien}`
    )
    if (output.error) {
      return res.status(400).json({
        success: false,
        message: output.error,
      })
    }

    res.json({
      success: true,
      nhanVien: recordset[0],
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      message: 'Lỗi hệ thống',
    })
  }
})

router.get('/chua-dk-lich/:MaLich', async (req, res) => {
  try {
    let pool = await sql.connect(config)
    const { recordset, output } = await pool.query(
      `select a.* from NhanVien a
        where a.MaNhanVien not in (
          select MaNhanVien 
          from NhanVien_LichLamViec 
          where MaLich = ${req.params.MaLich}
        )`
    )
    if (output.error) {
      return res.status(400).json({
        success: false,
        message: output.error,
      })
    }

    res.json({
      success: true,
      dsNhanVien: recordset,
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      message: 'Lỗi hệ thống',
    })
  }
})

router.get('/dk-lich/:MaLich', async (req, res) => {
  try {
    let pool = await sql.connect(config)
    const { recordset, output } = await pool.query(
      `select a.* from NhanVien a, NhanVien_LichLamViec b where a.MaNhanVien = b.MaNhanVien and b.MaLich = ${req.params.MaLich}`
    )
    if (output.error) {
      return res.status(400).json({
        success: false,
        message: output.error,
      })
    }

    res.json({
      success: true,
      dsNhanVien: recordset,
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
