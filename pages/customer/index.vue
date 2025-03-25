<script setup lang="ts">
const { data: customers, refresh } = useFetch<CustomerInfo[]>('/api/customers');

const router = useRouter();

const handleCreate = async () => {
  await router.push('/customer/create');
};

const handleBack = async () => {
  await router.push('/');
};

const route = useRoute();
const showCreateSuccessBanner = ref(route.query.success === '1');
const showDeleteSuccessBanner = ref(false);
const confirm = ref(false);
const deleteTarget = ref('');

const handleDeleteCheck = (id: string) => {
  confirm.value = true;
  deleteTarget.value = id;
};

const handleDelete = async () => {
  confirm.value = false;

  try {
    await useFetch(`/api/customers/${deleteTarget.value}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error(error);
    return;
  } finally {
    deleteTarget.value = '';
  }

  showCreateSuccessBanner.value = false;
  showDeleteSuccessBanner.value = true;
  refresh();
};

definePageMeta({
  middleware: ['auth'],
});

onMounted(() => {
  if (showCreateSuccessBanner.value) {
    refresh();
    setTimeout(() => {
      router.replace({ path: '/customer' });
    }, 3000);
  }
});

const slide = ref('style');

type CustomerInfo = {
  id: number;
  name: string;
  location: string;
};

const columns: Array<{
  name: string;
  label: string;
  field: string;
  align: 'right' | 'left' | 'center';
  sortable?: boolean;
}> = [
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

  <q-banner v-if="showCreateSuccessBanner" class="bg-green-3 text-white q-pa-md">
    Customer created successfully!
  </q-banner>
  <q-banner v-if="showDeleteSuccessBanner" class="bg-green-3 text-white q-pa-md">
    Customer deleted successfully!
  </q-banner>

  <div class="q-ma-md flex justify-end">
    <q-btn color="primary" label="create" @click="handleCreate" />
  </div>

  <div class="pageContent">
    <q-table
      class="q-ma-md"
      title="Customer List"
      :rows="customers || []"
      :columns="columns"
      row-key="name"
    >
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
          <q-td key="delete">
            <q-btn push color="negative" @click="handleDeleteCheck(props.row.id)">Delete</q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="negative" text-color="white" />
          <span class="q-ml-sm">You should make sure to delete this content</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn v-close-popup flat outline label="Cancel" />
          <q-btn v-close-popup flat label="Delete" color="negative" @click="handleDelete" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div class="q-mt-md">
      <q-btn color="primary" outline label="back" @click="handleBack" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/page.scss';
</style>
