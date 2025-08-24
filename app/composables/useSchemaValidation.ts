import type z from 'zod';
import { ZodError } from 'zod';
import type { ZodTypeAny, ZodIssue } from 'zod';

export const useSchemaValidation = (schema: ZodTypeAny, errorMessage: Ref<ZodError | null>) => {
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

export const setErrorMessageList = (errorMessageList: Ref<string[]>, issues: ZodIssue[]) => {
  issues.forEach(issue => {
    errorMessageList.value.push(issue.path[0] + ': ' + issue.message);
  });
};
