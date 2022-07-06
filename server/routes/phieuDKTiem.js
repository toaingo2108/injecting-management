const express = require('express')
const router = express.Router()
const sql = require('mssql')
const config = require('../config')

router.get('/', async (req, res) => {
  try {
    let pool = await sql.connect(config)
    const { recordset, output } = await pool.query(
      'select * from PhieuDangKyTiem'
    )
    if (output.error) {
      return res.status(400).json({
        success: false,
        message: output.error,
      })
    }

    res.json({
      success: true,
      dsPhieuDKTiem: recordset,
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      message: 'Lỗi hệ thống',
    })
  }
})

router.get('/:MaPhieuDK', async (req, res) => {
  try {
    let pool = await sql.connect(config)
    const { recordset, output } = await pool.query(
      `select * from PhieuDangKyTiem where MaPhieuDK = ${req.params.MaPhieuDK}`
    )
    if (output.error) {
      return res.status(400).json({
        success: false,
        message: output.error,
      })
    }

    res.json({
      success: true,
      phieuDKTiem: recordset[0],
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
  const { MaKhachHang, NgayLap } = req.body
  try {
    let pool = await sql.connect(config)
    const { recordset, output } = await pool.query(
      `insert into PhieuDangKyTiem (MaKhachHang, NgayLap) 
        output inserted.*
        values (${MaKhachHang}, '${NgayLap}')`
    )
    if (output.error) {
      return res.status(400).json({
        success: false,
        message: output.error,
      })
    }

    res.json({
      success: true,
      phieuDKTiem: recordset[0],
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
