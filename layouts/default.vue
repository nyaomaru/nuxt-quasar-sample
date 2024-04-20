<script lang="ts" setup>
import { computed } from 'vue';
import { useMeta } from 'quasar';

// const metaData = {
//   title: 'Nyaomaru Nuxt',

//   meta: {
//     description: { name: 'description', content: 'Top Page' },
//     keywords: { name: 'keywords', content: 'Nyaomaru' },
//     equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
//     ogTitle: {
//       property: 'og:title',
//     },
//   },

//   noscript: {
//     default: 'This is content for browsers with no JS (or disabled JS)',
//   },
// };

// useMeta(metaData);

// useMeta(() => {
//   return {
//     title: 'Nyaomaru Nuxt',
//     meta: {
//       description: { name: 'description', content: 'Top Page' },
//       keywords: { name: 'keywords', content: 'Nyaomaru' },
//       equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
//       ogTitle: {
//         property: 'og:title',
//       },
//     },

//     noscript: {
//       default: 'This is content for browsers with no JS (or disabled JS)',
//     },
//   };
// });
</script>

<template>
  <q-layout view="lHh Lpr lFf" class="container bg-grey-9 text-white">
    <header class="header">
      <slot name="header" />
    </header>
    <main class="main">
      <q-drawer v-model="rightDrawerOpen" show-if-above side="right" bordered>
        <div>test</div>
      </q-drawer>
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
