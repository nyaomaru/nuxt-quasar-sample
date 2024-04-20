<script setup lang="ts">
import SingleSubmitButton from '@/components/molecules/SingleSubmitButton.vue';

const router = useRouter();

const handleClick = () => {
  router.push('/test');
};
</script>

<template>
  <h1>Index Page</h1>
  <p>This is index page</p>
  <SingleSubmitButton button-name="GO TEST PAGE" :disabled="false" :onclick="handleClick" />
</template>
