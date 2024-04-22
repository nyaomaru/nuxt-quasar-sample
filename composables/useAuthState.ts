type Auth = {
  isAuthenticated: boolean;
  userName: string;
  password: string;
};

export const useAuthState = () => {
  const auth = useState<Auth>('auth');

  auth.value.isAuthenticated = sessionStorage.getItem('isLogin') !== null ? true : false;
  auth.value.userName = localStorage.getItem('userName') ?? '';
  auth.value.password = localStorage.getItem('password') ?? '';

  return auth;
};
