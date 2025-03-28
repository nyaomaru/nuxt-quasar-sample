import type { AuthSchema, AuthCheckSchema } from '@/schemas/login';

export const useAuthState = () => {
  return useState<AuthCheckSchema & { accessToken: string | null }>('auth', () => ({
    isAuthenticated: false,
    userName: '',
    accessToken: null,
  }));
};

export const resetAuth = () => {
  const auth = useAuthState();
  auth.value = {
    isAuthenticated: false,
    userName: '',
    accessToken: null,
  };
};

export const authCheck = (loginForm: AuthSchema, errorMessageList: Ref<string[]>) => {
  const auth = useAuthState();

  if (loginForm['userName'] !== auth.value['userName']) {
    errorMessageList.value.push(`userName is not correct`);
  }

  if (errorMessageList.value.length === 0) {
    auth.value.isAuthenticated = true;
  }
};
