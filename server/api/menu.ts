import { ROUTE } from '@/constants/route';

export default defineEventHandler(event => {
  return [
    {
      label: 'Profile',
      icon: 'pets',
      separator: true,
      link: ROUTE.PROFILE,
    },
    {
      label: 'Customer',
      icon: 'pets',
      separator: true,
      link: ROUTE.CUSTOMER,
    },
    {
      label: 'Nyaomaru Demo',
      icon: 'pets',
      separator: true,
    },
    {
      label: 'Nyaomaru Demo',
      icon: 'pets',
      separator: true,
    },
    {
      label: 'Nyaomaru Demo',
      icon: 'pets',
      separator: true,
    },
  ];
});
