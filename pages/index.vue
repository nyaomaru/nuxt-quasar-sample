<script setup lang="ts">
import SingleSubmitButton from '~/components/atoms/SingleSubmitButton.vue';

const router = useRouter();

const handleClick = async (event: MouseEvent) => {
  await router.push('/test');
};
</script>

<template>
  <p>Index Page</p>
  <SingleSubmitButton :onclick="handleClick"> </SingleSubmitButton>
</template>
