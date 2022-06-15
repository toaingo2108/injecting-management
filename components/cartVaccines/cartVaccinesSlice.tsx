import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Vaccine } from '~/model'

export interface CartVaccinesState {
  vaccines: Vaccine[]
}

const initialState: CartVaccinesState = {
  vaccines: [],
}

const cartVaccinesSlice = createSlice({
  name: 'cartVaccines',
  initialState,
  reducers: {
    addVaccineIntoCart: (state, action: PayloadAction<Vaccine>) => {
      state.vaccines.push(action.payload)
    },
    removeVaccineFromCart: (state, action: PayloadAction<string>) => {
      state.vaccines = state.vaccines.filter(
        (item) => item.id !== action.payload
      )
    },
  },
})

export default cartVaccinesSlice
