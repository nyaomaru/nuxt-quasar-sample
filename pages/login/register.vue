<script setup lang="ts">
import Form from '@/components/molecules/Form.vue';
import ErrorMessages from '@/components/molecules/ErrorMessages.vue';

import { ROUTE } from '@/constants/route';
import { authSchema, type AuthSchema } from '@/schemas/login';

const loginForm = reactive<AuthSchema>({ userName: '', password: '' });
const errorMessageList = ref<string[]>([]);

const errorMessage = ref('');
const { errorMessages } = useErrorMessage();
const { validate } = useSchemaValidation(authSchema, errorMessages);

const handleLogin = async () => {
  validate(loginForm);

  errorMessageList.value.splice(0);

  if (typeof errorMessages.value !== 'string' && errorMessages.value !== null) {
    const issues = errorMessages.value.issues;
    setErrorMessageList(errorMessageList, issues);
    errorMessages.value = null;
    return;
  }

  const { error } = await useFetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(loginForm),
  });

  if (error.value) {
    console.error(error.value);
    errorMessage.value = `Failed to login. Please try again.:${error.value}`;
    return;
  } else {
    const router = useRouter();
    router.push(ROUTE.LOGIN);
  }
};
</script>

<template>
  <h2>First, you need to create login user</h2>

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
