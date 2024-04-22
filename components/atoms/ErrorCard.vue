<script lang="ts" setup>
type Props = {
  errorMessage: string;
};

const props = withDefaults(defineProps<Props>(), {
  errorMessage: '',
});
</script>

<template>
  <q-card v-show="showError" class="bg-red text-white">
    <q-card-section>
      <div class="text-h6">{{ errorMessage }}</div>
    </q-card-section>
  </q-card>
</template>
