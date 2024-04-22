<script setup lang="ts">
import InputText from '@/components/atoms/InputText.vue';
import ErrorCard from '@/components/atoms/ErrorCard.vue';

onMounted(() => {
  const userInfo = localStorage.getItem('userName');
  if (!userInfo) {
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
  const { userName, password } = useAuthState().value;

  if (loginUserName.value !== userName) {
    errorSetting('User name is not correct');
    return;
  }

  if (loginPassword.value !== password) {
    errorSetting('Password is not correct');
    return;
  }

  sessionStorage.setItem('isLogin', 'true');

  const router = useRouter();
  router.push('/');
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
</template>
