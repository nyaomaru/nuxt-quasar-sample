import type { ZodError } from 'zod';

export const useErrorMessage = () => {
  const errorMessages = ref<ZodError | null>(null);
  const showError = ref<boolean>(false);

  return { errorMessages, showError };
};
