<script setup lang="ts">
import InputText from '@/components/atoms/InputText.vue';
import ErrorCard from '@/components/atoms/ErrorCard.vue';

import { resetAuth } from '@/composables/useAuthState';

import { useErrorMessage } from '@/composables/useErrorMessage';
</script>

<template>
  <h1>Login</h1>
  <NuxtPage />
</template>
