import z from 'zod';

export const authSchema = z.object({
  userName: z.string().min(1),
  password: z.string().min(1),
});

export type AuthSchema = z.infer<typeof authSchema>;
