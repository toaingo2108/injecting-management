import {
  LocationOn,
  // ContactSupport,
  Vaccines,
  Inventory,
} from '@mui/icons-material'

export const pages = [
  {
    name: 'Trung tâm',
    icon: <LocationOn fontSize="small" />,
    link: '/centers',
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
