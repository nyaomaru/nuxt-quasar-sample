<script lang="ts" setup>
const { data } = await useFetch('/api/nyaomaru');
</script>

<template>
  <q-footer elevated class="bg-primary text-white">
    <q-toolbar>
      <q-toolbar-title>
        <q-avatar>
          <img src="/images/demo-logo.png" >
        </q-avatar>
        {{ data?.footer }}
      </q-toolbar-title>
    </q-toolbar>
  </q-footer>
</template>
