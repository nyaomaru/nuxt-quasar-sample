type FetchOptions = {
  headers?: Record<string, string>;
  body?: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  credentials?: 'include';
};

export const useFetchWithAuth = () => {
  const auth = useAuthState();

  const authHeaders = {
    Authorization: `Bearer ${auth.value.accessToken}`,
  };

  const getAuthOptions = (options?: FetchOptions): FetchOptions => {
    if (!options) {
      return {
        method: 'GET',
        headers: authHeaders,
        credentials: 'include',
      };
    }

    return {
      ...options,
      headers: {
        ...options.headers,
        ...authHeaders,
      },
      credentials: 'include',
    };
  };

  const fetchWithAuth = async <T>(url: string, options?: FetchOptions): Promise<T> => {
    const fetchOptions = getAuthOptions(options);
    return $fetch<T>(url, fetchOptions) as T;
  };

  return {
    fetchWithAuth,
  };
};
