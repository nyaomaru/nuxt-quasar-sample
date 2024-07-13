import { ROUTE } from '@/constants/route';

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthState();

  if (!auth.value.isAuthenticated) {
    return navigateTo(ROUTE.LOGIN, { redirectCode: 301 });
  }
});
