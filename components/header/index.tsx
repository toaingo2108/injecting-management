// @mui/material
import { Box, Button } from '@mui/material'
import { pages } from '~/components/header/data'

const Header = () => {
  return (
    <Box
      sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}
    >
      {pages.map((page) => (
        <Button key={page.id} sx={{ my: 2, color: 'white', display: 'flex' }}>
          {page.icon} {page.name}
        </Button>
      ))}
    </Box>
  )
}

export default Header
