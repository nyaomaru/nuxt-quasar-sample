<script setup lang="ts">
import Form from '@/components/molecules/Form.vue';
import ErrorMessages from '@/components/molecules/ErrorMessages.vue';

import { resetAuth, authCheck } from '@/composables/useAuthState';
import { useErrorMessage } from '@/composables/useErrorMessage';
import {
  useSchemaValidation,
  setErrorMessageList,
} from '@/composables/validations/useSchemaValidation';

import { ROUTE } from '@/constants/route';

import { authSchema, type AuthSchema } from '@/schemas/login';

const router = useRouter();

onMounted(() => {
  const auth = useAuthState();
  if (!auth.value.userName || !auth.value.password) {
    router.push(ROUTE.REGISTER);
  }
});

const loginForm = reactive<AuthSchema>({ userName: '', password: '' });

const { errorMessages } = useErrorMessage();
const errorMessageList = ref<string[]>([]);
const { validate } = useSchemaValidation(authSchema, errorMessages);

const handleErrors = () => {
  errorMessageList.value = [];
  if (typeof errorMessages.value !== 'string' && errorMessages.value !== null) {
    setErrorMessageList(errorMessageList, errorMessages.value.issues);
    errorMessages.value = null;
    return false;
  }
  return true;
};

const handleLogin = () => {
  validate(loginForm);

  if (!handleErrors()) {
    return;
  }

  authCheck(loginForm, errorMessageList);

  router.push('/');
};

const resetUser = () => {
  resetAuth();
  router.push(ROUTE.REGISTER);
};
</script>

<template>
  <h2>Please type registered name and password again</h2>

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
