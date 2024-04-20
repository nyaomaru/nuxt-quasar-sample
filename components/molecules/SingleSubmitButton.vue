<script lang="ts" setup>
import SubmitButton from '@/components/atoms/SubmitButton.vue';

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
  <SubmitButton
    class="singleSubmitButton"
    id="single-submit-button"
    :buttonName="buttonName"
    :disabled="disabled || processing"
    @click="handleClick"
  />
</template>

<style lang="scss"></style>
