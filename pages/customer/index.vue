<script setup lang="ts">
const { data: customers, refresh } = useAsyncData<CustomerInfo[]>('/api/customers', () =>
  $fetch('/api/customers')
);

const router = useRouter();

const handleCreate = () => {
  router.push('/customer/create');
};

const handleBack = () => {
  router.push('/');
};

const route = useRoute();
const showCreateSuccessBanner = ref(route.query.success === '1');
const showDeleteSuccessBanner = ref(false);
const confirm = ref(false);
const deleteTarget = ref('');
const errorMessage = ref('');

const handleDeleteCheck = (id: string) => {
  confirm.value = true;
  deleteTarget.value = id;
};

const handleDelete = async () => {
  confirm.value = false;
  errorMessage.value = '';

  try {
    await useFetch(`/api/customers/${deleteTarget.value}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error(error);
    errorMessage.value = `Failed to delete customer. Please try again.`;
    return;
  } finally {
    deleteTarget.value = '';
  }

  showCreateSuccessBanner.value = false;
  showDeleteSuccessBanner.value = true;
  await refresh();
};

definePageMeta({
  middleware: ['auth'],
});

onMounted(async () => {
  if (showCreateSuccessBanner.value) {
    refresh().then(() => {
      setTimeout(() => {
        showCreateSuccessBanner.value = false;
      }, 3000);
    });
  }
});

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

  <q-banner v-if="showCreateSuccessBanner" class="bg-secondary text-white q-pa-md">
    Customer created successfully!
  </q-banner>
  <q-banner v-if="showDeleteSuccessBanner" class="bg-secondary text-white q-pa-md">
    Customer deleted successfully!
  </q-banner>
  <q-banner v-if="errorMessage" class="bg-negative text-white q-pa-md">
    {{ errorMessage }}
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
      row-key="id"
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
          <q-btn v-close-popup flat label="Confirm Delete" color="negative" @click="handleDelete" />
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
