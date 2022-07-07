const express = require('express')
const router = express.Router()
const sql = require('mssql')
const config = require('../config')

const getVacXin = async (MaGoiTiem) => {
  let pool = await sql.connect(config)
  const { recordset } = await pool.query(
    `select b.*, a.SoLuong from GoiTiem_VacXin a, VacXin b where a.MaGoiTiem = ${MaGoiTiem} and a.MaVacXin = b.MaVacXin`
  )
  return recordset
}

router.get('/', async (req, res) => {
  try {
    let pool = await sql.connect(config)
    const { recordset, output } = await pool.query('select * from GoiTiem')
    if (output.error) {
      return res.status(400).json({
        success: false,
        message: output.error,
      })
    }

    let dsGoiTiem = []

    for (let item of recordset) {
      const DSVacXin = await getVacXin(item.MaGoiTiem)
      item = { ...item, DSVacXin }
      dsGoiTiem.push(item)
    }

    res.json({
      success: true,
      dsGoiTiem,
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      message: 'Lỗi hệ thống',
    })
  }
})

router.get('/:MaGoiTiem', async (req, res) => {
  try {
    let pool = await sql.connect(config)
    const { recordset, output } = await pool.query(
      `select * from GoiTiem where MaGoiTiem = ${req.params.MaGoiTiem}`
    )
    if (output.error) {
      return res.status(400).json({
        success: false,
        message: output.error,
      })
    }

    let goiTiem = recordset[0]

    const DSVacXin = await getVacXin(goiTiem.MaGoiTiem)
    goiTiem = { ...goiTiem, DSVacXin }

    res.json({
      success: true,
      goiTiem,
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
      `select * from GoiTiem where MaGoiTiem in (
        select MaGoiTiem from PhieuDangKyTiem_GoiTiem where MaPhieuDK = ${req.params.MaPhieuDK}
      )`
    )
    if (output.error) {
      return res.status(400).json({
        success: false,
        message: output.error,
      })
    }

    let dsGoiTiem = []

    for (let item of recordset) {
      const DSVacXin = await getVacXin(item.MaGoiTiem)
      item = { ...item, DSVacXin }
      dsGoiTiem.push(item)
    }

    res.json({
      success: true,
      dsGoiTiem,
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
