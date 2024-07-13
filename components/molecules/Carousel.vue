<script setup lang="ts">
export type CarouselInfo = {
  name: string;
  icon: string;
  lorem: string;
};

type Props = {
  modelValue: string;
  carouselList: CarouselInfo[];
};

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <q-carousel
    :model-value="modelValue"
    transition-prev="scale"
    transition-next="scale"
    swipeable
    animated
    control-color="white"
    navigation
    padding
    arrows
    height="300px"
    class="bg-primary text-white shadow-1 rounded-borders"
    @update:model-value="(value: unknown) => emit('update:modelValue', value)"
  >
    <template v-for="(carousel, index) in carouselList" :key="index">
      <q-carousel-slide :name="carousel.name" class="column no-wrap flex-center">
        <q-icon :name="carousel.icon" size="80px" />
        <div class="q-mt-md text-center">
          {{ carousel.lorem }}
        </div>
      </q-carousel-slide>
    </template>
  </q-carousel>
</template>
