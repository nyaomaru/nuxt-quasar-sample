<script setup lang="ts">
import ErrorMessages from '@/components/molecules/ErrorMessages.vue';
import SuccessMessages from '@/components/molecules/SuccessMessages.vue';
import ContentCard from '@/components/molecules/ContentCard.vue';

import { customerSchema, type CustomerDetailSchema } from '@/schemas/customer';

const route = useRoute();
const { fetchWithAuth } = useFetchWithAuth();

const {
  data: customer,
  error,
  refresh,
} = await useAsyncData<CustomerDetailSchema>(`/api/customers/${route.params.id}`, () =>
  fetchWithAuth<CustomerDetailSchema>(`/api/customers/${route.params.id}`)
);

const router = useRouter();
const showUpdateSuccessBanner = ref(false);

const customerData = reactive<CustomerDetailSchema>({
  id: 0,
  name: '',
  location: '',
  hobby: '',
  age: 0,
});

const { errorMessages, handleValidationErrors, isValidateError } = useValidationError();
const errorMessageList = ref<string[]>([]);
const successMessageList = ref<string[]>([]);
const { validate } = useSchemaValidation(customerSchema, errorMessages);
const { handleApiError } = useApiError();

watch(
  customer,
  newData => {
    if (newData) {
      Object.assign(customerData, newData);
    }
  },
  { immediate: true }
);

const handleUpdate = async () => {
  customerData.age = Number(customerData.age);
  validate(customerData);
  handleValidationErrors(errorMessageList);

  if (isValidateError.value) return;

  try {
    await fetchWithAuth<Response>(`/api/customers/${route.params.id}`, {
      method: 'PUT',
      body: JSON.stringify(customerData),
    });

    successMessageList.value.push('Customer updated successfully!');
    showUpdateSuccessBanner.value = true;
    refresh();
  } catch (error) {
    handleApiError(error, errorMessageList, 'Failed to update customer. Please try again.');
  }
};

const handleBack = async () => {
  await router.push('/customer');
};
</script>

<template>
  <h1>Customer</h1>
  <h2>Customer Detail</h2>

  <SuccessMessages :success-messages="errorMessageList" />
  <ErrorMessages :error-messages="errorMessageList" />
  <div v-if="error">
    <q-banner class="bg-red text-white">
      {{ error.message }}
    </q-banner>
  </div>

  <div class="pageContent">
    <div class="pageContent__cardArea q-ma-md row">
      <ContentCard v-model="customerData.name" title="Name" icon="person" />
      <ContentCard v-model="customerData.location" title="Location" icon="place" />
      <ContentCard v-model="customerData.hobby" title="Hobby" icon="sports_esports" />
    </div>

    <div class="pageContent__cardArea q-ma-md row">
      <ContentCard v-model="customerData.age" title="Age" icon="cake" />
      <ContentCard v-model="customerData.id" title="ID" icon="face" :changeable="false" />
    </div>

    <div class="pageContent__button q-mt-md q-mb-md">
      <q-btn color="primary" outline label="back" @click="handleBack" />
      <q-btn color="primary" label="update" @click="handleUpdate" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/page.scss';

.pageContent {
  &__cardArea {
    display: flex;
    justify-content: center;
  }

  &__card {
    width: 24rem;
    color: black;

    &--title {
      display: flex;
      align-items: center;
      background-color: $grey-3;
    }
  }

  &__button {
    display: flex;
    justify-content: space-between;
  }
}
</style>
