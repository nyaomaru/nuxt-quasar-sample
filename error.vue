<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps({
  error: {
    type: Object as () => NuxtError,
    default: () => ({}),
  },
});

const handleError = () => clearError({ redirect: '/' });
</script>

<template>
  <div class="errorPage text-center">
    <h1 class="text-negative">{{ error.statusCode }}</h1>
    <p class="text-h6">{{ error.message }}</p>
    <q-btn label="Go to Home" color="primary" class="q-mt-md" @click="handleError" />
  </div>
</template>

<style scoped>
.errorPage {
  background-color: #f5f5f5;
  height: 100vh;
  justify-content: center;
  align-items: center;
}
</style>
