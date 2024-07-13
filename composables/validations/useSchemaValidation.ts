import type z from 'zod';
import { ZodError } from 'zod';
import type { ZodTypeAny } from 'zod';

export const useSchemaValidation = (
  schema: ZodTypeAny,
  errorMessage: Ref<string | null | ZodError>
) => {
  const validate = (data: z.infer<typeof schema>) => {
    try {
      schema.parse(data);
      if (errorMessage.value) {
        errorMessage.value = null;
      }
    } catch (e) {
      if (e instanceof ZodError) {
        errorMessage.value = e;
      }
    }
  };

  return {
    validate,
  };
};
