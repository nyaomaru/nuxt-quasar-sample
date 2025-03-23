<script setup lang="ts">
import InputText from '@/components/atoms/InputText.vue';
import ErrorCard from '@/components/atoms/ErrorCard.vue';
import Form from '@/components/molecules/Form.vue';

interface FormField {
  label: string;
  name: string;
  type?: string;
}

const props = defineProps<{
  fields: FormField[];
  modelValue: Record<string, string>;
  errorMessages?: string[];
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: unknown): void;
  (event: 'submit'): void;
}>();

const formFields = toRefs(props.modelValue);

watchEffect(() => {
  emit('update:modelValue', { ...props.modelValue });
});

const handleSubmit = () => {
  emit('submit');
};
</script>

<template>
  <Form @submit="handleSubmit">
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
      <q-btn type="submit" color="primary" label="Submit" />
    </div>
  </Form>
</template>
