const express = require('express')
const router = express.Router()
const sql = require('mssql')
const config = require('../config')

router.get('/phieu-dk-tiem/:MaPhieuDK', async (req, res) => {
  try {
    let pool = await sql.connect(config)
    const { recordset, output } = await pool.query(
      `select * from PhieuTiem where MaPhieuDK = ${req.params.MaPhieuDK} and TrangThai != 'NULL'`
    )
    if (output.error) {
      return res.status(400).json({
        success: false,
        message: output.error,
      })
    }

    res.json({
      success: true,
      dsPhieuTiem: recordset,
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      message: 'Lỗi hệ thống',
    })
  }
})

router.get('/:MaPhieuTiem', async (req, res) => {
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

router.post('/temp', async (req, res) => {
  const { MaPhieuDK } = req.body
  try {
    let pool = await sql.connect(config)
    const { recordset, output } = await pool.query(
      `insert into PhieuTiem (MaPhieuDK, MaNhanVien) 
        output inserted.*
        values (${MaPhieuDK}, 1)`
    )
    if (output.error) {
      return res.status(400).json({
        success: false,
        message: output.error,
      })
    }

    res.json({
      success: true,
      phieuTiem: recordset[0],
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
    NgayTiem,
    KetQuaKham,
    KetQuaSauTiem,
    TrangThai,
    STT,
  } = req.body
  try {
    let pool = await sql.connect(config)
    const { recordset, output } = await pool.query(
      `insert into PhieuTiem (MaNhanVien, MaPhieuDK, NgayTiem, KetQuaKham, KetQuaSauTiem, TrangThai, STT)
      output inserted.*
      values (${MaNhanVien}, ${MaPhieuDK}, '${NgayTiem}', N'${KetQuaKham}', N'${KetQuaSauTiem}', N'${TrangThai}', ${STT})`
    )
    if (output.error) {
      return res.status(400).json({
        success: false,
        message: output.error,
      })
    }
    res.json({
      success: true,
      phieuTiem: recordset[0],
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      message: 'Lỗi hệ thống',
    })
  }
})

router.put('/:MaPhieuTiem', async (req, res) => {
  const { KetQuaSauTiem } = req.body
  try {
    let pool = await sql.connect(config)
    const { recordset, output } = await pool.query(
      `update PhieuTiem set KetQuaSauTiem = N'${KetQuaSauTiem}' output inserted.* where MaPhieuTiem = ${req.params.MaPhieuTiem}`
    )
    if (output.error) {
      return res.status(400).json({
        success: false,
        message: output.error,
      })
    }

    res.json({
      success: true,
      phieuTiem: recordset[0],
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
