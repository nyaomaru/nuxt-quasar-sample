<script lang="ts" setup>
import { isNumber, isString } from '@@/utils/is';

type Props = {
  modelValue?: string | number;
  label: string;
};

withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: 'input',
});

const textInputValidation = (val: string | number | unknown[]) => {
  if (isNumber(val)) return true;
  return (isString(val) && val.length > 0) || 'Please use minimum one string';
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
