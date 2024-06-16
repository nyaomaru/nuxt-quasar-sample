<script setup lang="ts">
import InputText from '@/components/atoms/InputText.vue';
import ErrorCard from '@/components/atoms/ErrorCard.vue';

import { useErrorMessage } from '@/composables/useErrorMessage';

import { ROUTE } from '@/constants/route';

const userName = ref('');
const password = ref('');

const [errorMessage, showError] = useErrorMessage();

const submit = () => {
  if (userName.value === '' || password.value === '') {
    showError.value = true;
    errorMessage.value = 'Please input more than one string';
    return;
  }

  const auth = useAuthState();
  auth.value.userName = userName.value;
  auth.value.password = password.value;

  const router = useRouter();
  router.push(ROUTE.LOGIN);
};

const updateValue = (value: string, target: string) => {
  target = value;
};
</script>

<template>
  <h2>First, you need to create login user</h2>
  <ErrorCard v-show="showError" :error-message="String(errorMessage)" />

  <div class="q-gutter-md" style="max-width: 300px">
    <h3>User Name</h3>
    <InputText v-model="userName" label="user name" />

    <h3>Password</h3>
    <InputText v-model="password" label="password" />
  </div>

  <q-btn color="primary" label="Submit" @click="submit" />
</template>
