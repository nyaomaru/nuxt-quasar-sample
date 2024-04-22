<script setup lang="ts">
import InputText from '@/components/atoms/InputText.vue';
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

  const auth = useAuthState();
  auth.value.userName = userName.value;
  auth.value.password = password.value;

  const router = useRouter();
  router.push('/login');
};

const updateValue = (value: string, target: string) => {
  target = value;
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
