<script lang="ts" setup>
import { ref } from 'vue';

type Props = {
  onclick: (e: MouseEvent) => Promise<unknown> | unknown;
  disabled: boolean;
  buttonName: string;
};

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  buttonName: 'Submit',
});

const processing = ref(false);

const handleClick = async (event: MouseEvent) => {
  if (processing.value) return;
  processing.value = true;

  try {
    props.onclick(event);
  } finally {
    processing.value = false;
  }
};
</script>

<template>
  <button
    id="single-submit-button"
    :buttonName="buttonName"
    :disabled="disabled || processing"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>
