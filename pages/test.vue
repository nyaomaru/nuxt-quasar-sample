<script setup lang="ts">
import singleSubmitButton from '~/components/atoms/SingleSubmitButton.vue';

const router = useRouter();

const handleClick = () => {
  router.push('/');
};
</script>

<template>
  <p>Test Page</p>
  <SingleSubmitButton @click="handleClick"> </SingleSubmitButton>
</template>
