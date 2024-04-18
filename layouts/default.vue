<template>
  <div class="container">
    <header
      class="container__section container__section--header"
      v-show="hasHeader"
    >
      <slot name="header" />
    </header>
    <div class="container__section container__section--body columns">
      <main class="container__section container__section--body">
        <Nuxt />
      </main>
    </div>
    <footer
      class="container__section container__section--footer"
      v-show="hasFooter"
    >
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'default',
  setup(_, { slots }) {
    const hasHeader = computed(() => !!slots.header);
    const hasFooter = computed(() => !!slots.footer);

    return {
      hasHeader,
      hasFooter,
    };
  },
});
</script>
