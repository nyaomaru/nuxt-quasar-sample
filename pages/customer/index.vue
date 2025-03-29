<script setup lang="ts">
import ErrorMessages from '@/components/molecules/ErrorMessages.vue';
import SuccessMessages from '@/components/molecules/SuccessMessages.vue';

const { fetchWithAuth } = useFetchWithAuth();

const {
  data: customers,
  refresh,
  status,
} = await useAsyncData<CustomerInfo[]>('/api/customers', () => {
  return fetchWithAuth('/api/customers');
});

const router = useRouter();
const route = useRoute();
const confirm = ref(false);
const deleteTarget = ref('');
const errorMessageList = ref<string[]>([]);
const successMessageList = ref<string[]>([]);
const { handleApiError } = useApiError();

const handleCreate = () => {
  router.push('/customer/create');
};

const handleBack = () => {
  router.push('/');
};

const handleDeleteCheck = (id: string) => {
  confirm.value = true;
  deleteTarget.value = id;
};

const handleDelete = async () => {
  confirm.value = false;
  errorMessageList.value.splice(0);

  try {
    await fetchWithAuth(`/api/customers/${deleteTarget.value}`, {
      method: 'DELETE',
    });
  } catch (error) {
    handleApiError(error, errorMessageList, 'Failed to delete customer. Please try again.');
    return;
  } finally {
    deleteTarget.value = '';
  }

  successMessageList.value.splice(0);
  successMessageList.value.push('Customer deleted successfully!');

  await refresh();
};

onMounted(async () => {
  if (route.query.success === '1') {
    refresh().then(() => {
      successMessageList.value.push('Customer created successfully!');
      setTimeout(() => {
        successMessageList.value.splice(0);
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

  <SuccessMessages :success-messages="successMessageList" />
  <ErrorMessages :error-messages="errorMessageList" />

  <div class="q-ma-md flex justify-end">
    <q-btn color="primary" label="create" @click="handleCreate" />
  </div>

  <div class="pageContent">
    <div v-if="status === 'pending'" class="q-ma-md">
      <q-spinner-hourglass size="50px" />
    </div>
    <div v-else-if="status === 'success'" class="q-ma-md">
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
    </div>
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
