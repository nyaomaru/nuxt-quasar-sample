<script setup lang="ts">
import InputText from '@/components/atoms/InputText.vue';
import ErrorCard from '@/components/atoms/ErrorCard.vue';

import {
  useSchemaValidation,
  setErrorMessageList,
} from '@/composables/validations/useSchemaValidation';
import { useErrorMessage } from '@/composables/useErrorMessage';

import { ROUTE } from '@/constants/route';

import { authSchema, type AuthSchema } from '@/schemas/login';

const loginForm = ref<AuthSchema>({ userName: '', password: '' });
const errorMessageList = ref<string[]>([]);

const { errorMessages } = useErrorMessage();
const { validate } = useSchemaValidation(authSchema, errorMessages);

const submit = () => {
  validate(loginForm.value);

  errorMessageList.value.splice(0);
  if (typeof errorMessages.value !== 'string' && errorMessages.value !== null) {
    const issues = errorMessages.value.issues;
    setErrorMessageList(errorMessageList, issues);
    errorMessages.value = null;
    return;
  }

  const auth = useAuthState();
  auth.value.userName = loginForm.value.userName;
  auth.value.password = loginForm.value.password;

  const router = useRouter();
  router.push(ROUTE.LOGIN);
};

const updateValue = (value: string, target: string) => {
  target = value;
};
</script>

<template>
  <h2>First, you need to create login user</h2>
  <template v-for="(message, index) in errorMessageList" :key="index">
    <ErrorCard v-show="message !== ''" class="q-mb-md" :error-message="message" />
  </template>

  <form>
    <div class="q-gutter-md" style="max-width: 300px">
      <p>User Name</p>
      <InputText v-model="loginForm.userName" label="user name" />

      <p>Password</p>
      <InputText v-model="loginForm.password" label="password" />
    </div>

    <q-btn color="primary" label="Submit" @click="submit" />
  </form>
</template>
