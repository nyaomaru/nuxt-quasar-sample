<script setup lang="ts">
import InputText from '@/components/atoms/InputText.vue';
import ErrorCard from '@/components/atoms/ErrorCard.vue';

import { useSchemaValidation } from '@/composables/validations/useSchemaValidation';
import { useErrorMessage } from '@/composables/useErrorMessage';

import { ROUTE } from '@/constants/route';

import { authSchema } from '@/schemas/login';

const loginForm = ref({ userName: '', password: '' });
const userNameErrorMessage = ref('');
const passwordErrorMessage = ref('');

const { errorMessages, showError } = useErrorMessage();
const { validate } = useSchemaValidation(authSchema, errorMessages);

const submit = () => {
  validate(loginForm.value);

  if (errorMessages.value !== '') {
    if (typeof errorMessages.value !== 'string' && errorMessages.value !== null) {
      const issues = errorMessages.value.issues;
      issues.forEach(issue => {
        if (issue.path[0] === 'userName') {
          userNameErrorMessage.value = issue.path[0] + ': ' + issue.message;
        }
        if (issue.path[0] === 'password') {
          passwordErrorMessage.value = issue.path[0] + ': ' + issue.message;
        }
      });
      showError.value = true;
      errorMessages.value = '';
      return;
    }
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
  <ErrorCard
    v-show="userNameErrorMessage !== ''"
    class="q-mb-md"
    :error-message="userNameErrorMessage"
  />
  <ErrorCard
    v-show="passwordErrorMessage !== ''"
    class="q-mb-md"
    :error-message="passwordErrorMessage"
  />

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
