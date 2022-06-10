import {
  LocationOn,
  CalendarMonth,
  ShoppingCart,
  ContactSupport,
} from '@mui/icons-material'

export const pages = [
  {
    id: 1,
    name: 'Tìm trung tâm',
    icon: <LocationOn fontSize="small" />,
    link: '/home',
  },
  {
    id: 2,
    name: 'Đăng ký tiêm',
    icon: <CalendarMonth fontSize="small" />,
    link: '/about',
  },
  {
    id: 3,
    name: 'Đặt mua vắc xin',
    icon: <ShoppingCart fontSize="small" />,
    link: '/blog',
  },
  {
    id: 4,
    name: 'Tư vấn',
    icon: <ContactSupport fontSize="small" />,
    link: '/blog',
  },
]
