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
  <button id="submit-button" class="submitButton" :disabled="disabled">
    {{ buttonName }}
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.submitButton {
  align-items: center;
  justify-content: center;
  line-height: 1;
  text-decoration: none;
  color: #ffffff;
  font-size: 16px;
  border-radius: 0px;
  width: 200px;
  height: 40px;
  font-weight: bold;
  border: 2px solid #ffffff;
  transition: 0.3s;
  box-shadow: 0px 4px 10px -2px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  background: linear-gradient(to bottom right, blue, black);

  :hover {
    box-shadow: 0 0 rgba(0, 0, 0, 0.3);
  }
}
</style>
