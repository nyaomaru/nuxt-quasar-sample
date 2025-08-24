export const ROUTE = {
  TOP: '/',
  LOGIN: '/login',
  REGISTER: '/login/register',
  PROFILE: '/profile',
  CUSTOMER: '/customer',
  NOT_FOUND: '/:pathMatch(.*)*',
} as const;

export type Route = (typeof ROUTE)[keyof typeof ROUTE];
