import {
  GoiTiem,
  KhachHang,
  LichLamViec,
  NguoiGiamHo,
  PhieuDKTiem,
  VacXin,
} from '~/model'

export const totalPriceCart = (
  cartVaccines: VacXin[],
  cartGoiTiem: GoiTiem[]
) => {
  let total = 0
  for (let vaccine of cartVaccines) {
    total += vaccine.GiaTien
  }
  for (let goiTiem of cartGoiTiem) {
    total += goiTiem.TongTien
  }
  return total
}

export const taoKhachHang = async (khachHang: KhachHang) => {
  const res = await fetch('http://localhost:5000/api/khach-hang', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(khachHang),
  })
  const data = await res.json()
  return data.khachHang
}

export const taoPhieuDKTiem = async (phieuDKTiem: PhieuDKTiem) => {
  const res = await fetch('http://localhost:5000/api/phieu-dk-tiem', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(phieuDKTiem),
  })
  const data = await res.json()
  return data.phieuDKTiem
}

export const taoNguoiGiamHo = async (nguoiGiamHo: NguoiGiamHo) => {
  const res = await fetch('http://localhost:5000/api/nguoi-giam-ho', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(nguoiGiamHo),
  })
  const data = await res.json()
  return data.nguoiGiamHo
}

export const rowsGoiTiem = (goiTiem: GoiTiem) => {
  return goiTiem.DSVacXin.map((vacxin, index) => ({
    id: index + 1,
    prevention: vacxin.MoTa,
    name: vacxin.TenVacXin,
    origin: vacxin.TenNSX,
    soLuong: vacxin.SoLuong,
  }))
}

export const tongSoLieuGoiTiem = (goiTiem: GoiTiem) => {
  let total = 0
  for (let item of goiTiem.DSVacXin) {
    total = total + item.SoLuong
  }
  return total
}

export const dkLichLamViec = async (MaLich: number, MaNhanVien: number) => {
  const res = await fetch('http://localhost:5000/api/nhan-vien-lich-lam-viec', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ MaLich, MaNhanVien }),
  })
  const data = await res.json()
  return data.nhanVien_LichLamViec
}

export const taoLichLamViec = async (lichLamViec: LichLamViec) => {
  const res = await fetch('http://localhost:5000/api/lich-lam-viec', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(lichLamViec),
  })
  const data = await res.json()
  return data.lichLamViec
}
