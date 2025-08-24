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
  <div v-if="isLoading" class="fixed-center full-width full-height bg-black flex flex-center">
    <q-spinner color="primary" size="4em" />
  </div>
  <slot v-else />
</template>
