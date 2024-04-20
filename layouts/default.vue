<script lang="ts" setup>
import { computed } from 'vue';
</script>

<template>
  <div class="container">
    <header class="header">
      <slot name="header" />
    </header>
    <main class="main">
      <slot />
    </main>
    <footer class="footer">
      <slot name="footer"></slot>
    </footer>
  </div>
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

.header,
.footer {
  @extend %containerSection;
}
</style>
