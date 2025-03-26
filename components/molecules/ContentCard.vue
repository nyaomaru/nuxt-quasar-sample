<script setup lang="ts">
const props = defineProps<{
  title: string;
  icon: string;
  modelValue: string | number;
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: unknown): void;
}>();

const isEditing = ref(false);
const description = ref(props.modelValue);

watchEffect(() => {
  emit('update:modelValue', description.value);
});

const stopEditing = () => {
  isEditing.value = false;
};
</script>

<template>
  <q-card class="contentCard col-4 q-ma-md">
    <q-card-section class="contentCard__title">
      <q-icon class="q-mr-md" :name="icon" color="black" size="16px" />
      <div class="text-h6">{{ title }}</div>
    </q-card-section>

    <q-separator dark inset />

    <q-card-section class="q-ma-md">
      <template v-if="isEditing">
        <q-input v-model="description" autofocus dense outlined @blur="stopEditing" />
      </template>
      <template v-else>
        <div class="text-subtitle1" @click="isEditing = true">
          {{ description }}
        </div>
      </template>
    </q-card-section>
  </q-card>
</template>

<style lang="scss" scoped>
.contentCard {
  width: 24rem;
  color: black;

  &__title {
    display: flex;
    align-items: center;
    background-color: $grey-3;
  }
}
</style>
