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
    :rules="[(val: string | any[]) => val.length > 0 || 'Please use minimum one string']"
    @update:model-value="(value: any) => emit('update:modelValue', value)"
  />
</template>
