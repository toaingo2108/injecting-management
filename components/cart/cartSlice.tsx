import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GoiTiem, VacXin } from '~/model'

export interface CartState {
  vaccines: VacXin[]
  goiTiem: GoiTiem[]
}

const initialState: CartState = {
  vaccines: [],
  goiTiem: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addVaccineIntoCart: (state, action: PayloadAction<VacXin>) => {
      state.vaccines.push(action.payload)
    },
    addGoiTiemIntoCart: (state, action: PayloadAction<GoiTiem>) => {
      state.goiTiem.push(action.payload)
    },
    removeVaccineFromCart: (state, action: PayloadAction<number>) => {
      state.vaccines = state.vaccines.filter(
        (item) => item.MaVacXin !== action.payload
      )
    },
    removeGoiTiemFromCart: (state, action: PayloadAction<number>) => {
      state.goiTiem = state.goiTiem.filter(
        (item) => item.MaGoiTiem !== action.payload
      )
    },
    resetCart: (state) => {
      state.goiTiem = []
      state.vaccines = []
    },
  },
})

export default cartSlice
