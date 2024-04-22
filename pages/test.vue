<script setup lang="ts">
import SingleSubmitButton from '@/components/molecules/SingleSubmitButton.vue';

const router = useRouter();

const handleClick = async () => {
  await router.push('/test');
};
</script>

<template>
  <h1>Test Page</h1>
  <p>This is test page</p>
  <SingleSubmitButton button-name="GO INDEX PAGE" :disabled="false" :onclick="handleClick" />
</template>
