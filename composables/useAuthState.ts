import { ROUTE } from '@/constants/route';
import type { AuthSchema, AuthCheckSchema } from '@/schemas/login';

type RefreshResponse = {
  statusCode: number;
  statusMessage?: string;
  access_token: string;
};

export const useAuthState = () => {
  const auth = useState<AuthCheckSchema & { accessToken: string | null }>('auth', () => ({
    isAuthenticated: false,
    userName: '',
    accessToken: null,
  }));

  const resetAuth = () => {
    auth.value = {
      isAuthenticated: false,
      userName: '',
      accessToken: null,
    };
  };

  const checkAuth = async () => {
    if (auth.value.isAuthenticated) return;

    const { fetchWithAuth } = useFetchWithAuth();

    try {
      const response = await fetchWithAuth<RefreshResponse>('/api/auth/refresh', {
        method: 'POST',
      });

      if (response.statusCode !== 200) throw new Error('Refresh token invalid');

      auth.value.isAuthenticated = true;
      auth.value.accessToken = response.access_token;
    } catch (error) {
      auth.value.isAuthenticated = false;
      navigateTo(ROUTE.LOGIN);
    }
  };

  return { auth, resetAuth, checkAuth };
};
