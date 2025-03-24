import z from 'zod';

export const customerSchema = z.object({
  name: z.string().min(1),
  location: z.string().min(1),
  hobby: z.string().min(1),
  age: z.number().min(1),
});

export type CustomerSchema = z.infer<typeof customerSchema>;
