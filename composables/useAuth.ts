const login = async (name: string, password: string) => {
  const auth = useAuthState();

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
  const auth = useAuthState();

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

export const useAuth = () => {
  return { login, refreshAccessToken };
};
