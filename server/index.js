const express = require('express')
const cors = require('cors')
const app = express()

// const testRouter = require('./routes/test')
// const authRouter = require('./routes/auth')
const goiTiemRouter = require('./routes/goiTiem')
const khachHangRouter = require('./routes/khachHang')
const lichLamViecRouter = require('./routes/lichLamViec')
const nguoiGiamHoRouter = require('./routes/nguoiGiamHo')
const nhanVienRouter = require('./routes/nhanVien')
const nhanVienLichLamViecRouter = require('./routes/nhanVienLichLamViec')
const phieuDKTiemRouter = require('./routes/phieuDKTiem')
const trungTamRouter = require('./routes/trungTam')
const vacXinRouter = require('./routes/vacXin')

app.use(express.json())
app.use(cors())

// app.use('/api', testRouter)
// app.use('/api/auth', authRouter)
app.use('/api/goi-tiem', goiTiemRouter)
app.use('/api/khach-hang', khachHangRouter)
app.use('/api/lich-lam-viec', lichLamViecRouter)
app.use('/api/nguoi-giam-ho', nguoiGiamHoRouter)
app.use('/api/nhan-vien', nhanVienRouter)
app.use('/api/nhan-vien-lich-lam-viec', nhanVienLichLamViecRouter)
app.use('/api/phieu-dk-tiem', phieuDKTiemRouter)
app.use('/api/trung-tam', trungTamRouter)
app.use('/api/vac-xin', vacXinRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
