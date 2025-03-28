<script setup lang="ts">
import Form from '@/components/molecules/Form.vue';
import ErrorMessages from '@/components/molecules/ErrorMessages.vue';

import { customerSchema, type CustomerSchema } from '@/schemas/customer';

const router = useRouter();

const { fetchWithAuth } = useFetchWithAuth();

const customerForm = reactive<CustomerSchema>({ name: '', location: '', hobby: '', age: 0 });

const errorMessage = ref('');
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

  try {
    await fetchWithAuth<Response>('/api/customers', {
      method: 'POST',
      body: JSON.stringify(customerForm),
    });
    router.push('/customer?success=1');
  } catch (error) {
    console.error(error);
    errorMessage.value = `Failed to create customer. Please try again.:${error}`;
  }
};
</script>

<template>
  <h1>Customer</h1>
  <h2>Create new customer</h2>

  <q-banner v-if="errorMessage" class="bg-negative text-white q-pa-md">
    {{ errorMessage }}
  </q-banner>
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
