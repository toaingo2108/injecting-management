import styled from '@emotion/styled'
import { Grid } from '@mui/material'
import { TailSpin } from 'react-loader-spinner'
import theme from '~/src/theme'

const CustomizedLoader = styled(Grid)`
  position: absolute;
  height: 100vh;
  z-index: 10000;
  background-color: rgba(0, 0, 0, 0.2);
`

const Loader = () => {
  return (
    <CustomizedLoader container alignItems="center" justifyContent="center">
      <TailSpin
        height="50"
        width="50"
        color={theme.palette.primary.main}
        ariaLabel="loading-indicator"
      />
    </CustomizedLoader>
  )
}

export default Loader
