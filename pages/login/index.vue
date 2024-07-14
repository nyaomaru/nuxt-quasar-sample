<script setup lang="ts">
import InputText from '@/components/atoms/InputText.vue';
import ErrorCard from '@/components/atoms/ErrorCard.vue';

import { resetAuth, authCheck } from '@/composables/useAuthState';
import { useErrorMessage } from '@/composables/useErrorMessage';
import {
  useSchemaValidation,
  setErrorMessageList,
} from '@/composables/validations/useSchemaValidation';

import { ROUTE } from '@/constants/route';

import { authSchema, type AuthSchema } from '@/schemas/login';

onMounted(() => {
  const auth = useAuthState();
  if (auth.value.userName === '' || auth.value.password === '') {
    const router = useRouter();
    router.push(ROUTE.REGISTER);
  }
});

const { errorMessages } = useErrorMessage();

const loginForm = ref<AuthSchema>({ userName: '', password: '' });
const errorMessageList = ref<string[]>([]);

const { validate } = useSchemaValidation(authSchema, errorMessages);

const login = () => {
  validate(loginForm.value);

  errorMessageList.value.splice(0);
  if (typeof errorMessages.value !== 'string' && errorMessages.value !== null) {
    const issues = errorMessages.value.issues;
    setErrorMessageList(errorMessageList, issues);
    errorMessages.value = null;
    return;
  }

  authCheck(loginForm, errorMessageList);

  const router = useRouter();
  router.push('/');
};

const resetUser = () => {
  resetAuth();

  const router = useRouter();
  router.push(ROUTE.REGISTER);
};
</script>

<template>
  <template v-for="(message, index) in errorMessageList" :key="index">
    <ErrorCard v-show="message !== ''" class="q-mb-md" :error-message="message" />
  </template>

  <div class="q-gutter-md" style="max-width: 300px">
    <p>User name</p>
    <InputText v-model="loginForm.userName" label="user name" />

    <p>Password</p>
    <InputText v-model="loginForm.password" label="password" />
  </div>

  <div class="q-pa-sm">
    <q-btn color="primary" label="Login" @click="login" />
  </div>
  <div class="q-pa-sm">
    <q-btn color="red" label="Reset User" @click="resetUser" />
  </div>
</template>
