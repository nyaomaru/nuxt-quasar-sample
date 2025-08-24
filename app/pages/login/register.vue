<script setup lang="ts">
import Form from '@/components/molecules/Form.vue';
import ErrorMessages from '@/components/molecules/ErrorMessages.vue';

import { ROUTE } from '@/constants/route';
import { authSchema, type AuthSchema } from '@@/schemas/login';

const loginForm = ref<AuthSchema>({ userName: '', password: '' });
const errorMessageList = ref<string[]>([]);

const { errorMessages, handleValidationErrors, isValidateError } = useValidationError();
const { validate } = useSchemaValidation(authSchema, errorMessages);
const { handleApiError } = useApiError();

const handleLogin = async () => {
  validate(loginForm.value);
  handleValidationErrors(errorMessageList);

  if (isValidateError.value) return;

  const { error } = await useFetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(loginForm.value),
  });

  if (error.value) {
    handleApiError(error.value, errorMessageList, 'Failed to login. Please try again.');
    return;
  } else {
    const router = useRouter();
    router.push(ROUTE.LOGIN);
  }
};
</script>

<template>
  <h2>First, you need to create login user</h2>

  <ErrorMessages :error-messages="errorMessageList" />
  <Form
    v-model="loginForm"
    :fields="[
      { label: 'User Name', name: 'userName' },
      { label: 'Password', name: 'password', type: 'password' },
    ]"
    :handle-submit="handleLogin"
  />
</template>
