<script lang="ts" setup>
type Props = {
  disabled: boolean;
  buttonName: string;
};

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  buttonName: 'Submit',
});

const processing = ref(false);
</script>

<template>
  <q-btn push color="primary">
    {{ buttonName }}
    <slot />
  </q-btn>
</template>
