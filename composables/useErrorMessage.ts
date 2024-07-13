import type { ZodError } from 'zod';

export const useErrorMessage = () => {
  const errorMessages = ref<string | null | ZodError>(null);
  const showError = ref<boolean>(false);

  return { errorMessages, showError };
};
