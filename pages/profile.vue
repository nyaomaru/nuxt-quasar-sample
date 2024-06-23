<script setup lang="ts">
import SingleSubmitButton from '@/components/molecules/SingleSubmitButton.vue';
import type { CarouselInfo } from '@/components/molecules/Carousel.vue';
import Carousel from '@/components/molecules/Carousel.vue';

const router = useRouter();

const handleClick = async () => {
  await router.push('/');
};

definePageMeta({
  middleware: ['auth'],
});

const slide = ref('style');

const { data: carouselList } = await useFetch<CarouselInfo[]>('/api/profile');
</script>

<template>
  <h1>Profile Page</h1>
  <div class="pageContent">
    <h2>Nyaomaru Profile</h2>
    <Carousel v-model="slide" :carousel-list="carouselList ?? []" />

    <div class="pageContent__button">
      <SingleSubmitButton button-name="GO INDEX PAGE" :disabled="false" :onclick="handleClick" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pageContent {
  text-align: center;

  &__button {
    margin-top: 20px;
  }
}
</style>
