import { VacXin } from '~/model/vacXin'

interface VacXinInGoiTiem extends VacXin {
  SoLuong: number
}

export interface GoiTiem {
  MaGoiTiem: number
  TenGoiTiem: string
  DSVacXin: VacXinInGoiTiem[]
  TongTien: number
  MoTa: string
}
