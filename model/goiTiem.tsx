import { Vaccine } from './vaccine'

export interface GoiTiem {
  MaGoiTiem: number
  DSVacXin: { VacXin: Vaccine; SoLuong: number }[]
  TongTien: number
  MoTa: string
}
