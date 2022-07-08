import { CartState } from '~/components/cart/cartSlice'
import {
  ChiTietPhieuDK,
  GoiTiem,
  HoaDon,
  KhachHang,
  LichLamViec,
  NguoiGiamHo,
  NhanVienTrungTam,
  PhieuDKTiem,
  PhieuDKTiem_GoiTiem,
  PhieuTiem,
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

export const rowsPhieuTiem = (dsPhieuTiem: PhieuTiem[]) => {
  return dsPhieuTiem.map((item, index) => ({
    id: index + 1,
    MaPhieuTiem: item.MaPhieuTiem,
    MaNhanVien: item.MaNhanVien,
    NgayTiem: item.NgayTiem,
    KetQuaKham: item.KetQuaKham,
    KetQuaSauTiem: item.KetQuaSauTiem,
    TrangThai: item.TrangThai,
    STT: item.STT,
  }))
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

export const getDsNhanVienTrungTam = async () => {
  const dataDsNhanVienTrungTam = await fetch(
    `${apiUrl}/nhan-vien/trung-tam/all`
  ).then((data) => data.json())
  const dsNhanVienTrungTam: NhanVienTrungTam[] =
    dataDsNhanVienTrungTam.dsNhanVienTrungTam
  return dsNhanVienTrungTam
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

export const taoChiTietPhieuDK = async (chiTietPhieuDK: ChiTietPhieuDK) => {
  try {
    const res = await fetch(`${apiUrl}/chi-tiet-phieu-dk`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(chiTietPhieuDK),
    })
    const data = await res.json()
    return data.chiTietPhieuDK
  } catch (error) {
    return {
      notFound: true,
    }
  }
}

export const taoPhieuDKTiem_GoiTiem = async (
  phieuDKTiem_GoiTiem: PhieuDKTiem_GoiTiem
) => {
  try {
    const res = await fetch(`${apiUrl}/phieu-dk-tiem-goi-tiem`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(phieuDKTiem_GoiTiem),
    })
    const data = await res.json()
    return data.phieuDKTiem_GoiTiem
  } catch (error) {
    return {
      notFound: true,
    }
  }
}

export const taoDKTiem = async (
  phieuDKTiem: PhieuDKTiem,
  MaTrungTam: number,
  NgayTiem: string,
  cart: CartState,
  MaPhieuTiem: number
) => {
  try {
    if (cart.goiTiem.length > 0) {
      for (let goiTiem of cart.goiTiem) {
        await taoPhieuDKTiem_GoiTiem({
          MaGoiTiem: goiTiem.MaGoiTiem,
          MaPhieuDK: phieuDKTiem.MaPhieuDK,
          SoLuong: 1,
          TinhTrang: '',
        })
        for (let vacXin of goiTiem.DSVacXin) {
          await taoChiTietPhieuDK({
            MaPhieuDK: phieuDKTiem.MaPhieuDK,
            MaTrungTam,
            NgayTiem,
            MaGoiTiem: goiTiem.MaGoiTiem,
            MaVacXin: vacXin.MaVacXin,
            SoLuong: vacXin.SoLuong,
            MaPhieuTiem: MaPhieuTiem,
            TinhTrang: '',
            GhiChu: '',
          })
        }
      }
    }
    if (cart.vaccines.length > 0) {
      for (let vacXin of cart.vaccines) {
        await taoChiTietPhieuDK({
          MaPhieuDK: phieuDKTiem.MaPhieuDK,
          MaTrungTam,
          NgayTiem,
          MaGoiTiem: 0,
          MaVacXin: vacXin.MaVacXin,
          SoLuong: 1,
          MaPhieuTiem: MaPhieuTiem,
          TinhTrang: '',
          GhiChu: '',
        })
      }
    }
    return { success: true }
  } catch (error) {
    console.log(error)
    return {
      success: false,
    }
  }
}

export const getKhachHang = async (MaKhachHang: number) => {
  const res = await fetch(`${apiUrl}/khach-hang/${MaKhachHang}`)
  const data = await res.json()
  const khachHang: KhachHang = data.khachHang
  return khachHang
}

export const taoPhieuTiem_temp = async (MaPhieuDK: number) => {
  try {
    const res = await fetch(`${apiUrl}/phieu-tiem/temp`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ MaPhieuDK }),
    })
    const data = await res.json()
    return data.phieuTiem
  } catch (error) {
    console.log(error)
    return {
      notFound: true,
    }
  }
}

export const taoHoaDon = async (hoaDon: HoaDon) => {
  try {
    const res = await fetch(`${apiUrl}/hoa-don`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(hoaDon),
    })
    const data = await res.json()
    return data.hoaDon
  } catch (error) {
    console.log(error)
    return {
      notFound: true,
    }
  }
}

export const taoPhieuTiem = async (phieuTiem: PhieuTiem) => {
  try {
    const res = await fetch(`${apiUrl}/phieu-tiem`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(phieuTiem),
    })
    const data = await res.json()
    return data.phieuTiem
  } catch (error) {
    console.log(error)
    return {
      notFound: true,
    }
  }
}
