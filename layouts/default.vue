<script lang="ts" setup>
import { computed } from 'vue';

// const slots = defineSlots();

// const hasHeader = computed(() => !!slots.header);
// const hasFooter = computed(() => !!slots.footer);
</script>

<template>
  <div class="container">
    <!-- <header
      class="container__section container__section--header"
      v-show="hasHeader"
    >
      <slot name="header" />
    </header> -->
    <div class="container__section container__section--body columns">
      <main class="container__section container__section--body">
        <slot />
      </main>
    </div>
    <!-- <footer
      class="container__section container__section--footer"
      v-show="hasFooter"
    >
      <slot name="footer"></slot>
    </footer> -->
  </div>
</template>
