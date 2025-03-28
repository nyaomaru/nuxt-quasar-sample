<script lang="ts" setup>
import { ROUTE } from '@/constants/route';
import Drawer, { type Menu } from '@/components/molecules/Drawer.vue';

const { data: comment } = await useFetch('/api/nyaomaru');

const { data: menuList } = await useFetch<Menu[]>('/api/menu');

const { logout } = useAuth();

const route = useRoute();

const rightDrawerOpen = ref(false);

const toggleRightDrawer = () => {
  if (route.path !== ROUTE.LOGIN) {
    rightDrawerOpen.value = !rightDrawerOpen.value;
  }
};

const handleLogout = () => {
  logout();
};
</script>

<template>
  <q-header elevated class="bg-black text-white">
    <q-toolbar>
      <q-toolbar-title class="headerTitle" @click="toggleRightDrawer">
        <q-avatar size="24px" class="q-mb-xs">
          <img src="/images/demo-logo.png" alt="logo" height="24px" width="24px" >
        </q-avatar>
        {{ comment?.nyaomaru }}
      </q-toolbar-title>

      <q-btn class="q-pa-sm" color="primary" outline label="logout" @click="handleLogout" />
    </q-toolbar>
  </q-header>

  <Drawer v-model="rightDrawerOpen" :menu-list="menuList ?? []" />
</template>

<style lang="scss" scoped>
.headerTitle {
  cursor: pointer;
}
</style>
