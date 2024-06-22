export const useErrorMessage = () => {
  const errorMessage = ref<string>('');
  const showError = ref<boolean>(false);

  return [errorMessage, showError];
};
