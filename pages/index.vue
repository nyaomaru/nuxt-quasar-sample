<script setup lang="ts">
import SingleSubmitButton from '@/components/molecules/SingleSubmitButton.vue';
import { ROUTE } from '@/constants/route';

const router = useRouter();

const handleClick = () => {
  router.push(ROUTE.PROFILE);
};

definePageMeta({
  middleware: ['auth'],
});
</script>

<template>
  <h1>Top Page</h1>

  <div class="pageContent">
    <p>This is index page</p>

    <SingleSubmitButton button-name="PROFILE" :disabled="false" :onclick="handleClick" />
    <SingleSubmitButton button-name="PROFILE" :disabled="false" :onclick="handleClick" />
    <SingleSubmitButton button-name="PROFILE" :disabled="false" :onclick="handleClick" />
  </div>
</template>

<style lang="scss" scoped>
.pageContent {
  text-align: center;
}
</style>
