<script setup lang="ts">
import Form from '@/components/molecules/Form.vue';
import ErrorMessages from '@/components/molecules/ErrorMessages.vue';

import { customerSchema, type CustomerSchema } from '@@/schemas/customer';

const router = useRouter();

const { fetchWithAuth } = useFetchWithAuth();

const customerForm = ref<CustomerSchema>({ name: '', location: '', hobby: '', age: 0 });

const { errorMessages, handleValidationErrors, isValidateError } = useValidationError();
const errorMessageList = ref<string[]>([]);
const { validate } = useSchemaValidation(customerSchema, errorMessages);
const { handleApiError } = useApiError();

const handleSubmit = async () => {
  customerForm.value.age = Number(customerForm.value.age);
  validate(customerForm.value);
  handleValidationErrors(errorMessageList);

  if (isValidateError.value) return;

  try {
    await fetchWithAuth<Response>('/api/customers', {
      method: 'POST',
      body: JSON.stringify(customerForm.value),
    });
    router.push('/customer?success=1');
  } catch (error) {
    handleApiError(error, errorMessageList, 'Failed to create customer. Please try again.');
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
