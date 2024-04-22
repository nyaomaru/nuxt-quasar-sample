<script setup lang="ts">
import InputText from '@/components/atoms/InputText.vue';
import ErrorCard from '@/components/atoms/ErrorCard.vue';

import { resetAuth } from '@/composables/useAuthState';

onMounted(() => {
  const auth = useAuthState();
  if (auth.value.userName === '' || auth.value.password === '') {
    const router = useRouter();
    router.push('/register');
  }
});

const errorMessage = ref('');
const showError = ref(false);

const loginUserName = ref('');
const loginPassword = ref('');

const errorSetting = (message: string) => {
  showError.value = true;
  errorMessage.value = message;
};

const login = () => {
  const auth = useAuthState();

  if (loginUserName.value !== auth.value.userName) {
    errorSetting('User name is not correct');
    return;
  }

  if (loginPassword.value !== auth.value.password) {
    errorSetting('Password is not correct');
    return;
  }

  auth.value.isAuthenticated = true;

  const router = useRouter();
  router.push('/');
};

const resetUser = () => {
  resetAuth();

  const router = useRouter();
  router.push('/register');
};
</script>

<template>
  <h1>Login page</h1>
  <ErrorCard v-show="showError" :error-message="errorMessage" />
  <p>User name</p>
  <InputText v-model="loginUserName" label="user name" />
  <p>Password</p>
  <InputText v-model="loginPassword" label="password" />
  <q-btn color="primary" label="Login" @click="login" />
  <q-btn color="red" label="Reset User" @click="resetUser" />
</template>
