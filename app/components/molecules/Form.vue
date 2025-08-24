<script setup lang="ts">
import { reactive, watch } from 'vue';
import InputText from '@/components/atoms/InputText.vue';
import SingleSubmitButton from './SingleSubmitButton.vue';

type Flat = Record<string, string | number>;

type FormField = {
  label: string;
  name: string;
  type?: string;
};

const props = defineProps<{ fields: FormField[]; handleSubmit: () => void }>();

const model = defineModel<Flat>({ default: {} });

const names = props.fields.map(f => f.name);
const formState = reactive<Flat>(
  Object.fromEntries(names.map(n => [n, model.value?.[n] ?? ''])) as Flat
);

watch(
  formState,
  value => {
    model.value = { ...value };
  },
  { deep: true }
);

watch(
  model,
  newValue => {
    for (const name of names) formState[name] = (newValue?.[name] ?? '') as string | number;
  },
  { deep: true }
);
</script>

<template>
  <form class="q-gutter-md flex column q-pa-md q-max-w-sm">
    <div v-for="field in props.fields" :key="field.name">
      <div class="q-mb-sm">
        <label :for="field.name">{{ field.label }}</label>
      </div>

      <!-- LHSはメンバー式に：v-modelを分解 -->
      <InputText
        :id="field.name"
        :model-value="formState[field.name]"
        :label="field.label"
        :type="field.type || 'text'"
        @update:model-value="v => (formState[field.name] = v)"
      />
    </div>

    <div style="display: flex; justify-content: right">
      <SingleSubmitButton button-name="submit" :onclick="props.handleSubmit" />
    </div>
  </form>
</template>
