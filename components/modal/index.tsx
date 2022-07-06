import { Box, Modal } from '@mui/material'
import { ReactNode } from 'react'
import { useAppDispatch, useAppSelector } from '~/redux/hook'
import modalSlice from './modalSlice'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 5,
  minWidth: 500,
  p: 5,
}

interface Props {
  children: ReactNode
}

const MyModal = ({ children }: Props) => {
  const isOpen = useAppSelector((state) => state.modal.open)
  const dispatch = useAppDispatch()
  return (
    <Modal
      open={isOpen}
      onClose={() => dispatch(modalSlice.actions.closeModal())}
    >
      <Box sx={style}>{children}</Box>
    </Modal>
  )
}

export default MyModal
