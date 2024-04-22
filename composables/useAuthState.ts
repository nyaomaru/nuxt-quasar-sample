type Auth = {
  isAuthenticated: boolean;
  userName: string;
  password: string;
};

export const useAuthState = () => {
  const auth = useState<Auth>('auth', initAuth);

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
