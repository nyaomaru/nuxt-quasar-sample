<script lang="ts" setup>
import { useBreadCrumbs } from '@/composables/useBreadCrumbs';

const route = useRoute();

const { breadCrumbs, showBreadCrumbs } = useBreadCrumbs();

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
        <q-breadcrumbs v-if="showBreadCrumbs">
          <q-breadcrumbs-el label="Home" :to="{ path: '/' }" />
          <q-breadcrumbs-el
            v-for="(crumb, index) in breadCrumbs"
            :key="index"
            :label="crumb.label"
            :to="{ path: crumb.to }"
          />
        </q-breadcrumbs>
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
