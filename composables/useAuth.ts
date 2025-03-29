export const useAuth = () => {
  const { auth, resetAuth } = useAuthState();

  const login = async (name: string, password: string) => {
    try {
      const response = await $fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password }),
      });

      if (response.statusCode !== 200) {
        throw new Error('Login failed');
      }

      auth.value = {
        isAuthenticated: true,
        userName: name,
        accessToken: response.access_token,
      };
    } catch (error) {
      resetAuth();
      throw error;
    }
  };

  const refreshAccessToken = async () => {
    try {
      const response = await $fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.statusCode !== 200) {
        throw new Error('Failed to refresh token');
      }
      auth.value.accessToken = response.access_token;
    } catch (error) {
      console.error('Token refresh failed:', error);
      resetAuth();
    }
  };

  const logout = async () => {
    const router = useRouter();

    try {
      await $fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
      resetAuth();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return { login, refreshAccessToken, logout };
};
