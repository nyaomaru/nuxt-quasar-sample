<script setup lang="ts">
import InputText from '@/components/atoms/InputText.vue';
import ErrorCard from '@/components/atoms/ErrorCard.vue';

import { resetAuth } from '@/composables/useAuthState';

import { useErrorMessage } from '@/composables/useErrorMessage';

import { ROUTE } from '@/constants/route';

onMounted(() => {
  const auth = useAuthState();
  if (auth.value.userName === '' || auth.value.password === '') {
    const router = useRouter();
    router.push(ROUTE.REGISTER);
  }
});

const { errorMessages, showError } = useErrorMessage();

const loginUserName = ref('');
const loginPassword = ref('');

const errorSetting = (message: string) => {
  showError.value = true;
  errorMessages.value = message;
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
  router.push(ROUTE.REGISTER);
};
</script>

<template>
  <ErrorCard v-show="showError" :error-message="String(errorMessages)" />

  <div class="q-gutter-md" style="max-width: 300px">
    <p>User name</p>
    <InputText v-model="loginUserName" label="user name" />

    <p>Password</p>
    <InputText v-model="loginPassword" label="password" />
  </div>

  <div class="q-pa-sm">
    <q-btn color="primary" label="Login" @click="login" />
  </div>
  <div class="q-pa-sm">
    <q-btn color="red" label="Reset User" @click="resetUser" />
  </div>
</template>
