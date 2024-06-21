<script lang="ts" setup>
const route = useRoute();

useHead({
  meta: [{ property: 'og:title', content: `App Name - ${route.meta.title}` }],
});
</script>

<template>
  <q-layout class="container bg-grey-9 text-white">
    <header class="header">
      <slot name="header" />
    </header>
    <main class="main">
      <q-page-container>
        <slot />
      </q-page-container>
    </main>
    <footer class="footer">
      <slot name="footer" />
    </footer>
  </q-layout>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

%containerSection {
  display: flex;
  flex-grow: 1;
}

.main {
  height: 100vh;
}

.header,
.footer {
  @extend %containerSection;
}
</style>
