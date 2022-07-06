import {
  // LocationOn,
  CalendarMonth,
  // ContactSupport,
  Vaccines,
  Inventory,
} from '@mui/icons-material'

export const pages = [
  // {
  //   name: 'Tìm trung tâm',
  //   icon: <LocationOn fontSize="small" />,
  //   link: '/injections/search',
  // },
  {
    name: 'Đăng ký tiêm',
    icon: <CalendarMonth fontSize="small" />,
    link: '/injections/register',
  },
  {
    name: 'Tra cứu vắc xin',
    icon: <Vaccines fontSize="small" />,
    link: '/vaccines',
  },
  {
    name: 'Tra cứu gói tiêm',
    icon: <Inventory fontSize="small" />,
    link: '/packages',
  },
  // {
  //   name: 'Tư vấn',
  //   icon: <ContactSupport fontSize="small" />,
  //   link: '/advise',
  // },
]
