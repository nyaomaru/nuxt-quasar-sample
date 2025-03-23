<script setup lang="ts">
const emit = defineEmits<{
  (event: 'submit'): void;
}>();
</script>

<template>
  <form class="q-gutter-md flex column q-pa-md q-max-w-sm" @submit.prevent="emit('submit')">
    <slot />
  </form>
</template>

<style lang="scss" scoped>
form {
  max-width: 400px;
}
</style>
