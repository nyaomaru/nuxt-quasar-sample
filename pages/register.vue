<script setup lang="ts">
import ErrorCard from '@/components/atoms/ErrorCard.vue';

const userName = ref('');
const password = ref('');

const errorMessage = ref('');
const showError = ref(false);

const submit = () => {
  if (userName.value === '' || password.value === '') {
    showError.value = true;
    errorMessage.value = 'Please input more than one string';
    return;
  }

  localStorage.setItem('userName', userName.value);
  localStorage.setItem('password', password.value);

  const router = useRouter();
  router.push('/login');
};
</script>

<template>
  <h1>User Register</h1>
  <ErrorCard v-show="showError" :error-message="errorMessage" />
  <p>User Name</p>
  <InputText v-model="userName" label="user name" />
  <p>Password</p>
  <InputText v-model="password" label="password" />
  <q-btn color="primary" label="Submit" @click="submit" />
</template>
