import React from 'react'
import { Grid, Typography } from '@mui/material'
import Image from 'next/image'
import vaccineImage from '~/public/img/vaccine.png'

interface Props {
  title?: string
}

const ListEmpty = ({ title = 'DANH SÁCH TRỐNG' }: Props) => {
  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <Image src={vaccineImage} alt="empty" width={100} height={100} />
        <Typography
          variant="h5"
          color="text.secondary"
          textAlign="center"
          mt={2}
        >
          {title}
        </Typography>
      </Grid>
    </>
  )
}

export default ListEmpty
