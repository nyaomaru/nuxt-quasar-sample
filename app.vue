<script lang="ts" setup>
import Header from '@/components/organisms/Header.vue';
import Footer from '@/components/organisms/Footer.vue';
import Main from '@/components/templates/Main.vue';

useHead({
  title: 'Nyaomaru Nuxt',
  titleTemplate: (productCategory: unknown) => {
    return productCategory ? `${productCategory} - Nyaomaru Nuxt` : 'Nyaomaru Nuxt';
  },
  meta: [
    { name: 'description', content: 'Nyaomaru Page' },
    { name: 'keywords', content: 'Nyaomaru' },
    { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
    { property: 'og:title' },
  ],

  noscript: [{ innerHTML: 'This is content for browsers with no JS (or disabled JS)' }],
});
</script>

<template>
  <NuxtLayout>
    <template #header>
      <Header />
    </template>
    <Main>
      <template #main>
        <NuxtPage />
      </template>
    </Main>
    <template #footer>
      <Footer />
    </template>
  </NuxtLayout>
</template>

<style lang="scss">
@use '~/assets/scss/main.scss';
</style>
