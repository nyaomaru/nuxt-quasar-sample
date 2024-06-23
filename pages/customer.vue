<script setup lang="ts">
import SingleSubmitButton from '@/components/molecules/SingleSubmitButton.vue';
import type { CarouselInfo } from '@/components/molecules/Carousel.vue';
import Carousel from '@/components/molecules/Carousel.vue';

const router = useRouter();

const handleClick = async () => {
  await router.push('/');
};

definePageMeta({
  middleware: ['auth'],
});

const slide = ref('style');

type CustomerInfo = {
  id: number;
  name: string;
  location: string;
};

const { data: customerList } = await useFetch<CustomerInfo[]>('/api/customer');

const columns = [
  {
    name: 'id',
    label: 'ID',
    align: 'right',
    field: 'id',
    sortable: true,
  },
  {
    name: 'name',
    label: 'Name',
    align: 'left',
    field: 'name',
  },
  {
    name: 'location',
    label: 'Location',
    align: 'left',
    field: 'location',
    sortable: true,
  },
];
</script>

<template>
  <h1>Customer Page</h1>
  <div class="pageContent">
    <h2>Customer List</h2>
    <q-table title="Treats" :rows="customerList" :columns="columns" row-key="name" />

    <div class="pageContent__button">
      <SingleSubmitButton button-name="GO INDEX PAGE" :disabled="false" :onclick="handleClick" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pageContent {
  text-align: center;

  &__button {
    margin-top: 20px;
  }
}
</style>
