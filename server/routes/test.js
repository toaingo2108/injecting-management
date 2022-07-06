const express = require('express')
const router = express.Router()
const sql = require('mssql')
const config = require('../config')

const getVacXin = async (MaGoiTiem) => {
  let pool = await sql.connect(config)
  const { recordset, output } = await pool.query(
    `select b.*, a.SoLuong from GoiTiem_VacXin a, VacXin b where a.MaGoiTiem = ${MaGoiTiem} and a.MaVacXin = b.MaVacXin`
  )
  return recordset
}

router.get('/goi-tiem', async (req, res) => {
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

router.get('/goi-tiem/:MaGoiTiem', async (req, res) => {
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

router.get('/vac-xin', async (req, res) => {
  try {
    let pool = await sql.connect(config)
    const { recordset, output } = await pool.query('select * from VacXin')
    if (output.error) {
      return res.status(400).json({
        success: false,
        message: output.error,
      })
    }

    res.json({
      success: true,
      dsVacXin: recordset,
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      message: 'Lỗi hệ thống',
    })
  }
})

router.get('/vac-xin/:MaVacXin', async (req, res) => {
  try {
    let pool = await sql.connect(config)
    const { recordset, output } = await pool.query(
      `select * from VacXin where MaVacXin = ${req.params.MaVacXin}`
    )
    if (output.error) {
      return res.status(400).json({
        success: false,
        message: output.error,
      })
    }

    res.json({
      success: true,
      vacXin: recordset[0],
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      message: 'Lỗi hệ thống',
    })
  }
})

router.post('/khach-hang', async (req, res) => {
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

router.post('/phieu-dk-tiem', async (req, res) => {
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

router.post('/nguoi-giam-ho', async (req, res) => {
  const { TenNguoiGiamHo, MaPhieuDK, SoDienThoai, MoiQuanHe } = req.body
  try {
    let pool = await sql.connect(config)
    const { recordset, output } = await pool.query(
      `insert into NguoiGiamHo (TenNguoiGiamHo, MaPhieuDK, SoDienThoai, MoiQuanHe)
      output inserted.*
      values (N'${TenNguoiGiamHo}', ${MaPhieuDK}, '${SoDienThoai}', N'${MoiQuanHe}')`
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

router.post('/dk-lich-lam-viec', async (req, res) => {
  const { MaNhanVien, MaLich } = req.body
  try {
    let pool = await sql.connect(config)
    const { recordset, output } = await pool.query(
      `insert into NhanVien_LichLamViec (MaNhanVien, MaLich, DaDangKy, DaDuyet) 
      output inserted.*
      values (${MaNhanVien}, ${MaLich}, 1, 0)`
    )
    if (output.error) {
      return res.status(400).json({
        success: false,
        message: output.error,
      })
    }

    res.json({
      success: true,
      nhanVien_LichLamViec: recordset[0],
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      message: 'Lỗi hệ thống',
    })
  }
})

router.post('/lich-lam-viec', async (req, res) => {
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

router.get('/lich-lam-viec', async (req, res) => {
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

router.get('/lich-lam-viec/:MaLich', async (req, res) => {
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

router.get('/nhan-vien-chua-dk-lich/:MaLich', async (req, res) => {
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

router.get('/nhan-vien-dk-lich/:MaLich', async (req, res) => {
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

router.get('/nhan-vien/:MaNhanVien', async (req, res) => {
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

router.get('/phieu-dang-ky', async (req, res) => {
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

router.get('/phieu-dang-ky/:MaPhieuDK', async (req, res) => {
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

module.exports = router
