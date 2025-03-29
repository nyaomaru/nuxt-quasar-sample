<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useAuthState } from '@/composables/useAuthState';

const auth = useAuthState();
const isLoading = ref(true);

onMounted(async () => {
  try {
    await auth.checkAuth();
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div v-if="isLoading">
    <q-spinner-dots color="primary" size="2em" />
  </div>
  <slot v-else />
</template>
