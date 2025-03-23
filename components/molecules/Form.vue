<script setup lang="ts">
const emit = defineEmits<{
  (event: 'submit'): void;
}>();
</script>

<template>
  <form class="q-gutter-md" @submit.prevent="emit('submit')">
    <slot />
  </form>
</template>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
}
</style>
