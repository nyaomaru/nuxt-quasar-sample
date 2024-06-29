<script setup lang="ts">
import ContentCard from '@/components/molecules/ContentCard.vue';

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

const route = useRoute();

const { data: customerDetail } = await useFetch<CustomerDetail>('/api/detail', {
  params: { id: route.params.id },
});
</script>

<template>
  <h1>Customer</h1>
  <h2>Customer Detail</h2>
  <div class="pageContent">
    <div class="pageContent__cardArea q-ma-md row">
      <ContentCard title="Name" icon="person" :description="customerDetail?.name ?? ''" />
      <ContentCard title="Location" icon="place" :description="customerDetail?.location ?? ''" />
      <ContentCard title="Hobby" icon="sports_esports" :description="customerDetail?.hobby ?? ''" />
    </div>

    <div class="pageContent__cardArea q-ma-md row">
      <ContentCard title="Age" icon="cake" :description="String(customerDetail?.age)" />
      <ContentCard title="ID" icon="face" :description="String(customerDetail?.id)" />
    </div>

    <div class="pageContent__button">
      <q-btn color="primary" outline label="back" @click="handleClick" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pageContent {
  text-align: center;

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
