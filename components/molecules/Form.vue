<script setup lang="ts">
import InputText from '@/components/atoms/InputText.vue';
import ErrorCard from '@/components/atoms/ErrorCard.vue';
import SingleSubmitButton from './SingleSubmitButton.vue';

interface FormField {
  label: string;
  name: string;
  type?: string;
}

const props = defineProps<{
  fields: FormField[];
  modelValue: Record<string, string | number>;
  errorMessages?: string[];
  handleSubmit: () => void;
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: unknown): void;
}>();

const formFields = toRefs(props.modelValue);

watchEffect(() => {
  emit('update:modelValue', { ...props.modelValue });
});
</script>

<template>
  <form class="q-gutter-md flex column q-pa-md q-max-w-sm">
    <template v-if="errorMessages">
      <div v-for="(message, field) in errorMessages" :key="field">
        <ErrorCard v-show="message !== ''" class="q-mb-md" :error-message="message" />
      </div>
    </template>

    <div v-for="field in fields" :key="field.name">
      <div class="q-mb-sm">
        <label :for="field.name">{{ field.label }}</label>
      </div>
      <InputText
        :id="field.name"
        v-model="formFields[field.name].value"
        :label="field.label"
        :type="field.type || 'text'"
      />
    </div>

    <div style="display: flex; justify-content: right">
      <SingleSubmitButton button-name="submit" :onclick="handleSubmit" />
    </div>
  </form>
</template>

<style lang="scss" scoped>
form {
  max-width: 400px;
}
</style>
