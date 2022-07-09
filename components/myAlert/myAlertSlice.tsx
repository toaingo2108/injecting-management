import { AlertColor } from '@mui/material'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface payload {
  title: string
  type: AlertColor
}

export interface MyAlertState {
  isOpen: boolean
  title: string
  type: AlertColor
}

const initialState: MyAlertState = {
  isOpen: false,
  title: 'This is error alert',
  type: 'error',
}

const myAlertSlice = createSlice({
  name: 'myAlert',
  initialState,
  reducers: {
    openAlert: (state, action: PayloadAction<payload>) => {
      state.isOpen = true
      state.title = action.payload.title
      state.type = action.payload.type
    },
    closeAlert: (state) => {
      state.isOpen = false
    },
  },
})

export default myAlertSlice
