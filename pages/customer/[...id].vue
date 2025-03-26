<script setup lang="ts">
import ContentCard from '@/components/molecules/ContentCard.vue';

const route = useRoute();

// const { data: customer, error } = useAsyncData<CustomerDetail>(`customers-${route.params.id}`, () =>
//   $fetch(`/api/customers/${route.params.id}`)
// );

const { data: customer, error } = useFetch<CustomerDetail>(`/api/customers/${route.params.id}`);

const router = useRouter();

const customerData = ref<CustomerDetail>({
  id: 0,
  name: '',
  location: '',
  hobby: '',
  age: 0,
});

onMounted(() => {
  if (customer && customer.value) {
    customerData.value = customer.value;
  }
});

const handleClick = async () => {
  await router.push('/customer');
};

definePageMeta({
  middleware: ['auth'],
});

type CustomerDetail = {
  id: number;
  name: string;
  location: string;
  hobby: string;
  age: number;
};
</script>

<template>
  <h1>Customer</h1>
  <h2>Customer Detail</h2>
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
      <ContentCard v-model="customerData.id" title="ID" icon="face" />
    </div>

    <div class="pageContent__button">
      <q-btn color="primary" outline label="back" @click="handleClick" />
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
    margin-top: 20px;
  }
}
</style>
