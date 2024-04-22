<script lang="ts" setup>
import { ref } from 'vue';

type Props = {
  inputValue: string;
  label: string;
};

const props = withDefaults(defineProps<Props>(), {
  inputValue: '',
  label: 'input',
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <q-input
    :model-value="inputValue"
    filled
    label="user name"
    :rules="[val => val.length >= 0 || 'Please use minimum one string']"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>
