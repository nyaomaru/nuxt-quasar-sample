<script setup lang="ts">
import Form from '@/components/molecules/Form.vue';
import ErrorMessages from '@/components/molecules/ErrorMessages.vue';

import { ROUTE } from '@/constants/route';
import { authSchema, type AuthSchema } from '@@/schemas/login';

const router = useRouter();
const { resetAuth } = useAuthState();

const loginForm = ref<AuthSchema>({ userName: '', password: '' });

const { errorMessages, handleValidationErrors, isValidateError } = useValidationError();
const errorMessageList = ref<string[]>([]);
const { validate } = useSchemaValidation(authSchema, errorMessages);
const { login } = useAuth();
const { handleApiError } = useApiError();

const handleLogin = async () => {
  validate(loginForm.value);
  handleValidationErrors(errorMessageList);

  if (isValidateError.value) return;

  try {
    await login(loginForm.value.userName, loginForm.value.password);
    router.push('/');
  } catch (error) {
    handleApiError(error, errorMessageList, 'Failed to login. Please try again.');
  }
};

const handleRegister = () => {
  resetAuth();
  router.push(ROUTE.REGISTER);
};

definePageMeta({
  middleware: 'check-user',
});
</script>

<template>
  <h2>Please type registered name and password again</h2>

  <ErrorMessages :error-messages="errorMessageList" />

  <div class="q-ma-md flex justify-end">
    <q-btn color="primary" label="register" @click="handleRegister" />
  </div>

  <Form
    v-model="loginForm"
    :fields="[
      { label: 'User Name', name: 'userName' },
      { label: 'Password', name: 'password', type: 'password' },
    ]"
    :handle-submit="handleLogin"
  />
</template>
