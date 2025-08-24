<script lang="ts" setup>
const { data } = await useFetch('/api/nyaomaru');
</script>

<template>
  <q-footer elevated class="bg-black text-white">
    <q-toolbar>
      <q-toolbar-title>
        {{ data?.footer }}
      </q-toolbar-title>
    </q-toolbar>
  </q-footer>
</template>
