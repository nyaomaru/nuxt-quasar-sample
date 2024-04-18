<script setup lang="ts">
import singleSubmitButton from '~/components/atoms/SingleSubmitButton.vue';

const router = useRouter();

const handleClick = () => {
  router.push('/test');
};
</script>

<template>
  <p>Index Page</p>
  <SingleSubmitButton @click="handleClick"> </SingleSubmitButton>
</template>
