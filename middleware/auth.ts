import { ROUTE } from '@/constants/route';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuthState();
  if (auth.value.isAuthenticated) return;

  const { fetchWithAuth } = useFetchWithAuth();

  try {
    const response = await fetchWithAuth<Response>('/api/auth/refresh', { method: 'POST' });
    const data = await response.json();

    if (!response.ok) throw new Error('Refresh token invalid');

    auth.value.isAuthenticated = true;
    auth.value.accessToken = data.access_token;
  } catch (error) {
    resetAuth();
    return navigateTo(ROUTE.LOGIN);
  }
});
