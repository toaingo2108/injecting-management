const express = require('express')
const router = express.Router()
const sql = require('mssql')
const config = require('../config')

router.post('/', async (req, res) => {
  const { Ngay, Ca } = req.body
  try {
    let pool = await sql.connect(config)
    const { recordset, output } = await pool.query(
      `insert into LichLamViec (Ngay, Ca)
        output inserted.*
        values ('${Ngay}', ${Ca})`
    )
    if (output.error) {
      return res.status(400).json({
        success: false,
        message: output.error,
      })
    }

    res.json({
      success: true,
      lichLamViec: recordset[0],
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      message: 'Lỗi hệ thống',
    })
  }
})

router.get('/', async (req, res) => {
  try {
    let pool = await sql.connect(config)
    const { recordset, output } = await pool.query('select * from LichLamViec')
    if (output.error) {
      return res.status(400).json({
        success: false,
        message: output.error,
      })
    }

    res.json({
      success: true,
      dsLichLamViec: recordset,
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      message: 'Lỗi hệ thống',
    })
  }
})

router.get('/:MaLich', async (req, res) => {
  try {
    let pool = await sql.connect(config)
    const { recordset, output } = await pool.query(
      `select * from LichLamViec where MaLich = ${req.params.MaLich}`
    )
    if (output.error) {
      return res.status(400).json({
        success: false,
        message: output.error,
      })
    }

    res.json({
      success: true,
      lichLamViec: recordset[0],
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
