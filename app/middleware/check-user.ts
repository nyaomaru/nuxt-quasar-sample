import { ROUTE } from '@/constants/route';

export default defineNuxtRouteMiddleware(async () => {
  try {
    const { count } = await $fetch('/api/auth/check', {
      credentials: 'include',
    });

    if (count && count < 1) {
      return navigateTo(ROUTE.REGISTER);
    }
  } catch (error) {
    console.error('User check failed', error);
    return navigateTo(ROUTE.REGISTER);
  }
});
