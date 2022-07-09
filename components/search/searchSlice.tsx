import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SearchState {
  value: string
}

const initialState: SearchState = {
  value: '',
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    changeValueSearch: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
    resetSearch: (state) => {
      state.value = ''
    },
  },
})

export default searchSlice
