<script setup lang="ts">
import Form from '@/components/molecules/Form.vue';
import ErrorMessages from '@/components/molecules/ErrorMessages.vue';

import { useErrorMessage } from '@/composables/useErrorMessage';
import {
  useSchemaValidation,
  setErrorMessageList,
} from '@/composables/validations/useSchemaValidation';
import { ROUTE } from '@/constants/route';
import { customerSchema, type CustomerSchema } from '@/schemas/customer';
import { isString } from '@/utils/is';

const router = useRouter();

onMounted(() => {
  const auth = useAuthState();
  if (!auth.value.userName || !auth.value.password) {
    router.push(ROUTE.REGISTER);
  }
});

const customerForm = reactive<CustomerSchema>({ name: '', location: '', hobby: '', age: 0 });

const { errorMessages } = useErrorMessage();
const errorMessageList = ref<string[]>([]);
const { validate } = useSchemaValidation(customerSchema, errorMessages);

const handleErrorMessages = () => {
  errorMessageList.value = [];
  if (!isString(errorMessages.value) && errorMessages.value !== null) {
    setErrorMessageList(errorMessageList, errorMessages.value.issues);
    errorMessages.value = null;
  }
};

const isError = computed(() => errorMessageList.value.length > 0);

const handleSubmit = async () => {
  customerForm.age = Number(customerForm.age);
  validate(customerForm);
  handleErrorMessages();

  if (isError.value) {
    return;
  }

  const { error } = await useFetch('/api/customers', {
    method: 'POST',
    body: customerForm,
  });

  if (error.value) {
    console.error(error.value);
  } else {
    router.push('/customer?success=1');
  }
};
</script>

<template>
  <h1>Customer</h1>
  <h2>Create new customer</h2>

  <ErrorMessages :error-messages="errorMessageList" />

  <Form
    v-model="customerForm"
    :fields="[
      { label: 'Name', name: 'name' },
      { label: 'Location', name: 'location' },
      { label: 'Hobby', name: 'hobby' },
      { label: 'age', name: 'age', type: 'number' },
    ]"
    :handle-submit="handleSubmit"
  />
</template>
