<script setup lang="ts">
import { onMounted } from 'vue';
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

const { data: customerDetail } = await useFetch<CustomerDetail>('/api/detail', { params: 1 });
</script>

<template>
  <h1>Customer</h1>
  <div class="pageContent">
    <h2>Customer Detail</h2>

    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label>{{ customerDetail?.name }}</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ customerDetail?.location }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>{{ customerDetail?.hobby }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>{{ customerDetail?.age }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <div class="pageContent__button">
      <q-btn color="primary" outline label="back" @click="handleClick" />
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
