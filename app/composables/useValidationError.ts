import type { ZodError } from 'zod';
import { isString } from '@@/utils/is';

export const useValidationError = () => {
  const errorMessages = ref<ZodError | null>(null);
  const showError = ref<boolean>(false);
  const isValidateError = ref<boolean>(false);

  const handleValidationErrors = (errorMessageList: Ref<string[]>) => {
    errorMessageList.value.splice(0);

    if (!isString(errorMessages.value) && errorMessages.value !== null) {
      setErrorMessageList(errorMessageList, errorMessages.value.issues);
      errorMessages.value = null;
      isValidateError.value = true;
    } else {
      isValidateError.value = false;
    }
  };

  return {
    errorMessages,
    showError,
    isValidateError,
    handleValidationErrors,
  };
};
