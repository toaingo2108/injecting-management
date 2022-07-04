import { GoiTiem } from '~/model'
import { vaccines } from '~/data/vaccines'

export const danhSachGoiTiem: GoiTiem[] = [
  {
    MaGoiTiem: 1,
    DSVacXin: [
      {
        VacXin: vaccines[0],
        SoLuong: 2,
      },
      {
        VacXin: vaccines[1],
        SoLuong: 2,
      },
    ],
    TongTien: 14310000,
    MoTa: 'Gói vắc xin Hexaxim',
  },
  {
    MaGoiTiem: 2,
    DSVacXin: [
      {
        VacXin: vaccines[0],
        SoLuong: 2,
      },
      {
        VacXin: vaccines[1],
        SoLuong: 2,
      },
      {
        VacXin: vaccines[2],
        SoLuong: 2,
      },
    ],
    TongTien: 14190000,
    MoTa: 'Gói vắc xin Infanrix',
  },
]
