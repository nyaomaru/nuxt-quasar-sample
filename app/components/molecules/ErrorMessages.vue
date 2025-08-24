<script setup lang="ts">
import ErrorCard from '@/components/atoms/ErrorCard.vue';

const props = defineProps<{
  errorMessages?: string[];
}>();
</script>

<template>
  <template v-if="errorMessages">
    <div v-for="(message, field) in errorMessages" :key="field" class="q-mb-md">
      <ErrorCard v-show="message !== ''" :error-message="message" />
    </div>
  </template>
</template>
