<script setup lang="ts">
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
  <h1>Customer</h1>
  <h2>Customer List</h2>
  <div class="pageContent">
    <q-table class="q-ma-md" title="Treats" :rows="customerList" :columns="columns" row-key="name">
      <template #body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">
            <NuxtLink :to="{ name: 'customer-id', params: { id: props.row.id } }">
              {{ props.row.id }}
            </NuxtLink>
          </q-td>
          <q-td key="name" :props="props">
            <q-badge color="green">
              {{ props.row.name }}
            </q-badge>
          </q-td>
          <q-td key="location" :props="props">
            <q-badge color="orange">
              {{ props.row.location }}
            </q-badge>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <div class="q-mt-md">
      <q-btn color="primary" outline label="back" @click="handleClick" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pageContent {
  text-align: center;
}
</style>
