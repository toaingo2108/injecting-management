import { KhachHang, NguoiGiamHo, PhieuDKTiem } from '~/model'

export interface RegisterInjections {
  khachHang: KhachHang
  nguoiGiamHo: NguoiGiamHo
  phieuDKTiem: PhieuDKTiem
  MaTrungTam: number
  NgayTiem: string
}
