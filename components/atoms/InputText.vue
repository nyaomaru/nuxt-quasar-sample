<script lang="ts" setup>
type Props = {
  modelValue: string;
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
    :rules="[(val: string | unknown[]) => val.length > 0 || 'Please use minimum one string']"
    @update:model-value="(value: unknown) => emit('update:modelValue', value)"
  />
</template>
