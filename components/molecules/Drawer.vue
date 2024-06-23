<script setup lang="ts">
import type { Route } from '@/constants/route';

export type Menu = {
  label: string;
  icon: string;
  separator: string;
  link: Route;
};

type Props = {
  modelValue: boolean;
  menuList: Menu[];
};

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
});

const emit = defineEmits(['update:modelValue']);

const router = useRouter();

const handleClick = (url: Route) => {
  router.push(url);
};
</script>

<template>
  <q-drawer
    :model-value="modelValue"
    :width="200"
    :breakpoint="500"
    bordered
    class="text-black"
    @update:model-value="(value: any) => emit('update:modelValue', value)"
  >
    <q-scroll-area class="fit">
      <q-list>
        <template v-for="(menuItem, index) in menuList" :key="index">
          <q-item
            v-ripple
            clickable
            :active="menuItem.label === 'Outbox'"
            @click="handleClick(menuItem.link)"
          >
            <q-item-section avatar>
              <q-icon :name="menuItem.icon" />
            </q-item-section>
            <q-item-section>
              {{ menuItem.label }}
            </q-item-section>
          </q-item>
          <q-separator v-if="menuItem.separator" :key="'sep' + index" />
        </template>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>
