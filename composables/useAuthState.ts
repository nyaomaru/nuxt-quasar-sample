import type { AuthSchema, AuthCheckSchema } from '@/schemas/login';

export const useAuthState = () => {
  const auth = useState<AuthCheckSchema>('auth', initAuth);

  return auth;
};

export const initAuth = () => {
  return {
    isAuthenticated: false,
    userName: '',
    password: '',
  };
};

export const resetAuth = () => {
  const auth = useAuthState();
  auth.value.isAuthenticated = initAuth().isAuthenticated;
  auth.value.userName = initAuth().userName;
  auth.value.password = initAuth().password;
};

export const authCheck = (loginForm: Ref<AuthSchema>, errorMessageList: Ref<string[]>) => {
  const auth = useAuthState();
  const loginFormKeys = Object.keys(loginForm.value) as Array<keyof AuthSchema>;

  for (const key of loginFormKeys) {
    console.log(key);
    if (loginForm.value[key] !== auth.value[key]) {
      console.log(loginForm.value[key]);
      errorMessageList.value.push(`${key} is not correct`);
    }
  }

  if (errorMessageList.value.length > 0) {
    return;
  }

  auth.value.isAuthenticated = true;
};
