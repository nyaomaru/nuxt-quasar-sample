import { ROUTE } from '@/constants/route';

type RefreshResponse = {
  statusCode: number;
  statusMessage?: string;
  access_token: string;
};

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (!import.meta.client) return;

  const auth = useAuthState();
  if (auth.value.isAuthenticated) return;

  const { fetchWithAuth } = useFetchWithAuth();

  try {
    const response = await fetchWithAuth<RefreshResponse>('/api/auth/refresh', { method: 'POST' });

    if (response.statusCode !== 200) throw new Error('Refresh token invalid');

    auth.value.isAuthenticated = true;
    auth.value.accessToken = response.access_token;
  } catch (error) {
    resetAuth();
    return navigateTo(ROUTE.LOGIN);
  }
});
