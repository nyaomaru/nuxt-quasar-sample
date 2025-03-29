<script lang="ts" setup>
import { useBreadCrumbs } from '@/composables/useBreadCrumbs';
import AuthWrapper from '@/components/organisms/AuthWrapper.vue';

const route = useRoute();

const { breadCrumbs, showBreadCrumbs } = useBreadCrumbs();

const { checkAuth } = useAuthState();

onMounted(() => {
  checkAuth();
});

useHead({
  meta: [{ property: 'og:title', content: `App Name - ${route.meta.title}` }],
});
</script>

<template>
  <q-layout view="lHh lpr lFf" class="container bg-dark text-white">
    <AuthWrapper>
      <header class="header">
        <slot name="header" />
      </header>
      <main class="main q-mx-auto flex">
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
    </AuthWrapper>
  </q-layout>
</template>

<style lang="scss" scoped>
.container {
  flex-direction: column;
  width: 100%;
}

%containerSection {
  display: flex;
  flex-grow: 1;
}

.main {
  height: 100vh;
  width: 100%;
  max-width: 800px;
  min-width: 300px;
  margin: auto;
  padding: 0 16px;

  @media (max-width: 600px) {
    max-width: 100%;
  }

  @media (min-width: 600px) and (max-width: 900px) {
    max-width: 90%;
  }

  @media (min-width: 1200px) {
    max-width: 1000px;
  }

  @media (min-width: 1600px) {
    max-width: 1200px;
  }
}

.header,
.footer {
  @extend %containerSection;
}
</style>
