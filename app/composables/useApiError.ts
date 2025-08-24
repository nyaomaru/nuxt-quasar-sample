export const useApiError = () => {
  const handleApiError = (error: unknown, errorMessageList: Ref<string[]>, title?: string) => {
    console.error(error);
    errorMessageList.value.push(`${title}: ${error}`);
  };

  return { handleApiError };
};
