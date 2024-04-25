<script lang="ts" setup>
import Drawer from '@/components/molecules/Drawer.vue';

const { data: comment } = await useFetch('/api/nyaomaru');

const { data: menuList } = await useFetch('/api/menu');

const rightDrawerOpen = ref(false);

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value;
};
</script>

<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <q-toolbar-title>
        <q-avatar @click="toggleRightDrawer">
          <img src="/images/demo-logo.png" />
        </q-avatar>
        {{ comment?.nyaomaru }}
      </q-toolbar-title>

      <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
    </q-toolbar>
  </q-header>

  <Drawer v-model="rightDrawerOpen" :menu-list="menuList" />
</template>
