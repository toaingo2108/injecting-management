// @mui/material
import Link from 'next/link'
import { Box, Button } from '@mui/material'
import { pages } from '~/components/header/data'

const Header = () => {
  return (
    <Box
      sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}
    >
      {pages.map((page) => (
        <Link key={page.name} href={page.link}>
          <Button
            key={page.name}
            sx={{ my: 2, color: 'white', display: 'flex' }}
          >
            {page.icon} {page.name}
          </Button>
        </Link>
      ))}
    </Box>
  )
}

export default Header
