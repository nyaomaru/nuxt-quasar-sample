<script lang="ts" setup>
type Props = {
  modelValue: string | number;
  label: string;
};

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: 'input',
});

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
    :rules="[
      (val: string | number | unknown[]) => {
        if (isNumber(val)) return true;
        return (isString(val) && val.length > 0) || 'Please use minimum one string';
      },
    ]"
    @update:model-value="(value: unknown) => emit('update:modelValue', value)"
  />
</template>
