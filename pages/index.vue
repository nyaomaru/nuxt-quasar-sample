<script setup lang="ts">
import SingleSubmitButton from '@/components/molecules/SingleSubmitButton.vue';
import type { CarouselInfo } from '@/components/molecules/Carousel.vue';
import Carousel from '@/components/molecules/Carousel.vue';

const router = useRouter();

const handleClick = () => {
  router.push('/test');
};

definePageMeta({
  middleware: ['auth'],
});

const slide = ref('style');

const carouselList: CarouselInfo[] = [
  {
    name: 'style',
    icon: 'pets',
    lorem: 'Nyaomaru Demo',
  },
  {
    name: 'tv',
    icon: 'home',
    lorem: 'Nyaomaru is cat',
  },
  {
    name: 'layers',
    icon: 'hub',
    lorem: 'Nyaomaru is pet',
  },
  {
    name: 'map',
    icon: 'thumb_up',
    lorem: 'Nyaomaru is fluff ball',
  },
];
</script>

<template>
  <h1>Index Page</h1>
  <Carousel v-model="slide" :carousel-list="carouselList" />

  <div class="pageContent">
    <p>This is index page</p>

    <SingleSubmitButton button-name="GO TEST PAGE" :disabled="false" :onclick="handleClick" />
  </div>
</template>

<style lang="scss" scoped>
.pageContent {
  text-align: center;
}
</style>
