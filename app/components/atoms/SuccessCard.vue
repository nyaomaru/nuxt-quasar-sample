<script lang="ts" setup>
type Props = {
  successMessage: string;
};

withDefaults(defineProps<Props>(), {
  successMessage: '',
});
</script>

<template>
  <q-card v-show="showError" class="bg-secondary text-white q-pa-sm">
    <q-card-section>
      <div class="text-h6">{{ successMessage }}</div>
    </q-card-section>
  </q-card>
</template>
