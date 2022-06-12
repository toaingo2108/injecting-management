import {
  LocationOn,
  CalendarMonth,
  ShoppingCart,
  ContactSupport,
} from '@mui/icons-material'

export const pages = [
  {
    name: 'Tìm trung tâm',
    icon: <LocationOn fontSize="small" />,
    link: '/injections/search',
  },
  {
    name: 'Đăng ký tiêm',
    icon: <CalendarMonth fontSize="small" />,
    link: '/injections/register',
  },
  {
    name: 'Đặt mua vắc xin',
    icon: <ShoppingCart fontSize="small" />,
    link: '/injections/order',
  },
  {
    name: 'Tư vấn',
    icon: <ContactSupport fontSize="small" />,
    link: '/advise',
  },
]
