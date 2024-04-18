<script setup lang="ts">
import SingleSubmitButton from '~/components/atoms/SingleSubmitButton.vue';

const router = useRouter();

const handleClick = () => {
  router.push('/');
};
</script>

<template>
  <p>Test Page</p>
  <SingleSubmitButton :onclick="handleClick"> </SingleSubmitButton>
</template>
