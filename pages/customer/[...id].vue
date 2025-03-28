<script setup lang="ts">
import ContentCard from '@/components/molecules/ContentCard.vue';
import ErrorMessages from '@/components/molecules/ErrorMessages.vue';

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

const errorMessage = ref('');
const { errorMessages } = useErrorMessage();
const errorMessageList = ref<string[]>([]);
const { validate } = useSchemaValidation(customerSchema, errorMessages);

watch(
  customer,
  newData => {
    if (newData) {
      Object.assign(customerData, newData);
    }
  },
  { immediate: true }
);

const handleErrorMessages = () => {
  errorMessageList.value = [];
  if (!isString(errorMessages.value) && errorMessages.value !== null) {
    setErrorMessageList(errorMessageList, errorMessages.value.issues);
    errorMessages.value = null;
  }
};

const isError = computed(() => errorMessageList.value.length > 0);

const handleUpdate = async () => {
  customerData.age = Number(customerData.age);
  validate(customerData);
  handleErrorMessages();

  if (isError.value) {
    return;
  }

  try {
    await fetchWithAuth<Response>(`/api/customers/${route.params.id}`, {
      method: 'PUT',
      body: JSON.stringify(customerData),
    });

    showUpdateSuccessBanner.value = true;
    refresh();
  } catch (error) {
    console.error(error);
    errorMessage.value = `Failed to update customer. Please try again. ${error}`;
  }
};

const handleBack = async () => {
  await router.push('/customer');
};

definePageMeta({
  middleware: ['auth'],
});
</script>

<template>
  <h1>Customer</h1>
  <h2>Customer Detail</h2>
  <q-banner v-if="showUpdateSuccessBanner" class="bg-secondary text-white q-pa-md">
    Customer updated successfully!
  </q-banner>
  <ErrorMessages :error-messages="errorMessageList" />
  <q-banner v-if="errorMessage" class="bg-negative text-white q-pa-md">
    {{ errorMessage }}
  </q-banner>
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
