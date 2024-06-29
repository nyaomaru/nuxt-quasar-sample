<script setup lang="ts">
type Props = {
  title: string;
  icon: string;
  description: string;
};

const props = defineProps<Props>();
</script>

<template>
  <q-card class="contentCard col-4 q-ma-md">
    <q-card-section class="contentCard__title">
      <q-icon class="q-mr-md" :name="icon" color="black" size="16px" />
      <div class="text-h6">{{ title }}</div>
    </q-card-section>

    <q-separator dark inset />

    <q-card-section class="q-ma-md">
      <div class="text-subtitle1">{{ description }}</div>
    </q-card-section>
  </q-card>
</template>

<style lang="scss" scoped>
.contentCard {
  width: 24rem;
  color: black;

  &__title {
    display: flex;
    align-items: center;
    background-color: $grey-3;
  }
}
</style>
