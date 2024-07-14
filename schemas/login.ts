import z from 'zod';

export const authSchema = z.object({
  userName: z.string().min(1),
  password: z.string().min(1),
});

export type AuthSchema = z.infer<typeof authSchema>;

export const authCheckSchema = authSchema.extend({
  isAuthenticated: z.boolean(),
});

export type AuthCheckSchema = z.infer<typeof authCheckSchema>;
