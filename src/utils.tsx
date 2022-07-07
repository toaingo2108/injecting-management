import {
  GoiTiem,
  KhachHang,
  LichLamViec,
  NguoiGiamHo,
  PhieuDKTiem,
  VacXin,
} from '~/model'
import { apiUrl } from './constants'

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
  try {
    const res = await fetch(`${apiUrl}/khach-hang`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(khachHang),
    })
    const data = await res.json()
    return data.khachHang
  } catch (error) {
    return {
      notFound: true,
    }
  }
}

export const taoPhieuDKTiem = async (phieuDKTiem: PhieuDKTiem) => {
  try {
    const res = await fetch(`${apiUrl}/phieu-dk-tiem`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(phieuDKTiem),
    })
    const data = await res.json()
    return data.phieuDKTiem
  } catch (error) {
    return {
      notFound: true,
    }
  }
}

export const taoNguoiGiamHo = async (nguoiGiamHo: NguoiGiamHo) => {
  try {
    const res = await fetch(`${apiUrl}/nguoi-giam-ho`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(nguoiGiamHo),
    })
    const data = await res.json()
    return data.nguoiGiamHo
  } catch (error) {
    return {
      notFound: true,
    }
  }
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
  try {
    const res = await fetch(`${apiUrl}/nhan-vien-lich-lam-viec`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ MaLich, MaNhanVien }),
    })
    const data = await res.json()
    return data.nhanVien_LichLamViec
  } catch (error) {
    return {
      notFound: true,
    }
  }
}

export const taoLichLamViec = async (lichLamViec: LichLamViec) => {
  try {
    const res = await fetch(`${apiUrl}/lich-lam-viec`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(lichLamViec),
    })
    const data = await res.json()
    return data.lichLamViec
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
