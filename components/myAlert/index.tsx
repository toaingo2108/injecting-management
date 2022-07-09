import { Alert, Snackbar } from '@mui/material'
import React from 'react'
import { useAppDispatch, useAppSelector } from '~/redux/hook'
import myAlertSlice from './myAlertSlice'

const MyAlert = () => {
  const { isOpen, title, type } = useAppSelector((state) => state.myAlert)
  const dispatch = useAppDispatch()

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(myAlertSlice.actions.closeAlert())
  }

  return (
    <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
      <Alert variant="filled" severity={type}>
        {title}
      </Alert>
    </Snackbar>
  )
}

export default MyAlert
