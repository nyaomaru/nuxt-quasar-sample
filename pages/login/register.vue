<script setup lang="ts">
import Form from '@/components/molecules/Form.vue';
import ErrorMessages from '@/components/molecules/ErrorMessages.vue';

import {
  useSchemaValidation,
  setErrorMessageList,
} from '@/composables/validations/useSchemaValidation';
import { useErrorMessage } from '@/composables/useErrorMessage';

import { ROUTE } from '@/constants/route';

import { authSchema, type AuthSchema } from '@/schemas/login';

const loginForm = reactive<AuthSchema>({ userName: '', password: '' });
const errorMessageList = ref<string[]>([]);

const { errorMessages } = useErrorMessage();
const { validate } = useSchemaValidation(authSchema, errorMessages);

const handleLogin = () => {
  validate(loginForm);

  errorMessageList.value.splice(0);

  if (typeof errorMessages.value !== 'string' && errorMessages.value !== null) {
    const issues = errorMessages.value.issues;
    setErrorMessageList(errorMessageList, issues);
    errorMessages.value = null;
    return;
  }

  const auth = useAuthState();
  auth.value.userName = loginForm.userName;
  auth.value.password = loginForm.password;

  const router = useRouter();
  router.push(ROUTE.LOGIN);
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
