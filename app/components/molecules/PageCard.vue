<script setup lang="ts">
type Props = {
  title: string;
  subtitle: string;
  imgSrc: string;
  imgHeight?: string;
  imgWidth?: string;
  imgAlt?: string;
};

withDefaults(defineProps<Props>(), {
  imgHeight: '240px',
  imgWidth: '480px',
  imgAlt: 'image',
});

const emit = defineEmits<{
  (event: 'click'): void;
}>();

const toPage = () => {
  emit('click');
};
</script>

<template>
  <q-card class="pageCard" @click="toPage">
    <img :src="imgSrc" :height="imgHeight" :width="imgWidth" :alt="imgAlt" />

    <q-card-section>
      <div class="text-h6">{{ title }}</div>
      <div class="text-subtitle2">{{ subtitle }}</div>
    </q-card-section>
  </q-card>
</template>

<style lang="scss" scoped>
.pageCard {
  border: 2px solid transparent;
  box-sizing: border-box;
  border-color: $dark;

  &:hover {
    border-color: $primary;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
}
</style>
