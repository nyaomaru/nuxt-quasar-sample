<script setup lang="ts">
import Form from '@/components/molecules/Form.vue';
import ErrorMessages from '@/components/molecules/ErrorMessages.vue';

import { ROUTE } from '@/constants/route';
import { authSchema, type AuthSchema } from '@/schemas/login';

const router = useRouter();

const loginForm = reactive<AuthSchema>({ userName: '', password: '' });

const errorMessage = ref('');
const { errorMessages } = useErrorMessage();
const errorMessageList = ref<string[]>([]);
const { validate } = useSchemaValidation(authSchema, errorMessages);
const { login } = useAuth();

const handleErrors = () => {
  errorMessageList.value = [];
  if (typeof errorMessages.value !== 'string' && errorMessages.value !== null) {
    setErrorMessageList(errorMessageList, errorMessages.value.issues);
    errorMessages.value = null;
    return false;
  }
  return true;
};

const handleLogin = async () => {
  validate(loginForm);

  if (!handleErrors()) {
    return;
  }

  try {
    await login(loginForm.userName, loginForm.password);
    router.push('/');
  } catch (error) {
    console.error(error);
    errorMessage.value = `Failed to login. Please try again.:${error}`;
  }
};

const resetUser = () => {
  resetAuth();
  router.push(ROUTE.REGISTER);
};

definePageMeta({
  middleware: 'check-user',
});
</script>

<template>
  <h2>Please type registered name and password again</h2>

  <q-banner v-if="errorMessage" class="bg-negative text-white q-pa-md">
    {{ errorMessage }}
  </q-banner>
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
