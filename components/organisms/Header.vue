<script lang="ts" setup>
import Drawer, { type Menu } from '@/components/molecules/Drawer.vue';

const { data: comment } = await useFetch('/api/nyaomaru');

const { data: menuList } = await useFetch<Menu[]>('/api/menu');

const rightDrawerOpen = ref(false);

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value;
};
</script>

<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <q-toolbar-title class="headerTitle" @click="toggleRightDrawer">
        <q-avatar size="24px" class="q-mb-xs">
          <img src="/images/demo-logo.png" alt="logo" height="24px" width="24px" />
        </q-avatar>
        {{ comment?.nyaomaru }}
      </q-toolbar-title>

      <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
    </q-toolbar>
  </q-header>

  <Drawer v-model="rightDrawerOpen" :menu-list="menuList ?? []" />
</template>

<style lang="scss" scoped>
.headerTitle {
  cursor: pointer;
}
</style>
