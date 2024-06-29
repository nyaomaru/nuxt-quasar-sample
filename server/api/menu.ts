import { ROUTE } from '@/constants/route';

export default defineEventHandler(event => {
  return [
    {
      label: 'Profile',
      icon: 'account_circle',
      separator: true,
      link: ROUTE.PROFILE,
    },
    {
      label: 'Customer',
      icon: 'description',
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
