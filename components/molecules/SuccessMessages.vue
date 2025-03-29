<script setup lang="ts">
import SuccessCard from '@/components/atoms/SuccessCard.vue';

const props = defineProps<{
  successMessages?: string[];
}>();
</script>

<template>
  <template v-if="successMessages">
    <div v-for="(message, field) in successMessages" :key="field" class="q-mb-md">
      <SuccessCard v-show="message !== ''" :success-message="message" />
    </div>
  </template>
</template>
