<script lang="ts" setup>
import Header from '@/components/organisms/Header.vue';
import Footer from '@/components/organisms/Footer.vue';
</script>

<template>
  <NuxtLayout>
    <template #header>
      <Header />
    </template>
    <NuxtPage />
    <template #footer>
      <Footer />
    </template>
  </NuxtLayout>
</template>
