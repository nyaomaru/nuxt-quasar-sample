<script lang="ts" setup>
import { ref } from 'vue';

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
    color="white"
    filled
    label="user name"
    :rules="[val => val.length > 0 || 'Please use minimum one string']"
    @update:model-value="value => emit('update:modelValue', value)"
  />
</template>
