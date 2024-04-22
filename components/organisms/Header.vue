<script lang="ts" setup>
const { data } = await useFetch('/api/nyaomaru');

const rightDrawerOpen = ref(false);

const toggleRightDrawer = () => {
  console.log('test');
  rightDrawerOpen.value = !rightDrawerOpen.value;
};
</script>

<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <q-toolbar-title>
        <q-avatar>
          <img src="/images/demo-logo.png" >
        </q-avatar>
        {{ data?.nyaomaru }}
      </q-toolbar-title>

      <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
    </q-toolbar>
  </q-header>
</template>
