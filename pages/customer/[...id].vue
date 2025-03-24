<script setup lang="ts">
import ContentCard from '@/components/molecules/ContentCard.vue';

const route = useRoute();

const { data: customer, error } = useFetch<CustomerDetail>(`/api/customers/${route.params.id}`);

const router = useRouter();

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
      <ContentCard title="Name" icon="person" :description="customer?.name ?? ''" />
      <ContentCard title="Location" icon="place" :description="customer?.location ?? ''" />
      <ContentCard title="Hobby" icon="sports_esports" :description="customer?.hobby ?? ''" />
    </div>

    <div class="pageContent__cardArea q-ma-md row">
      <ContentCard title="Age" icon="cake" :description="String(customer?.age)" />
      <ContentCard title="ID" icon="face" :description="String(customer?.id)" />
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
