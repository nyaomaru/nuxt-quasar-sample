<script lang="ts" setup>
import is from 'is-kit';

type Props = {
  modelValue?: string | number;
  label: string;
};

withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: 'input',
});

const textInputValidation = (val: string | number | unknown[]) => {
  if (is.number(val)) return true;
  return (is.string(val) && val.length > 0) || 'Please use minimum one string';
};

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <q-input
    :model-value="modelValue"
    color="black"
    label-color="black"
    bg-color="white"
    filled
    :label="label"
    :rules="[textInputValidation]"
    @update:model-value="(value: unknown) => emit('update:modelValue', value)"
  />
</template>
