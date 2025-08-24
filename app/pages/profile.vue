<script setup lang="ts">
import type { CarouselInfo } from '@/components/molecules/Carousel.vue';
import Carousel from '@/components/molecules/Carousel.vue';

const router = useRouter();

const handleClick = async () => {
  await router.push('/');
};

const slide = ref('style');

const { data: carouselList } = await useFetch<CarouselInfo[]>('/api/profile');
</script>

<template>
  <h1>Profile</h1>

  <h2>Nyaomaru Profile</h2>

  <div class="pageContent">
    <Carousel v-model="slide" class="q-ma-md" :carousel-list="carouselList ?? []" />

    <div class="pageContent__button">
      <q-btn color="primary" outline label="back" @click="handleClick" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/page.scss';

.pageContent {
  &__button {
    margin-top: 20px;
  }
}
</style>
