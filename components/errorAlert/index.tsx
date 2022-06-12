import { styled } from '@mui/material/styles'
import { ErrorOutlined } from '@mui/icons-material'
import { Grid } from '@mui/material'

const ErrorInput = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.error.main,
}))

const ErrorAlert = ({ message }: { message: string }) => {
  return (
    <ErrorInput>
      <ErrorOutlined fontSize="small" />
      {message}
    </ErrorInput>
  )
}

export default ErrorAlert
