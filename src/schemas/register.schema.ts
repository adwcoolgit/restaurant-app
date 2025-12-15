import z from 'zod';

export const registerSchema = z
  .object({
    name: z.string().min(5, 'Name must be at leasts 5 characters'),
    email: z.string().email(),
    phone: z.coerce
      .string()
      .min(10, 'Phone number must be at least 10 characters'),
    password: z.string().min(6, 'Password must be at leasts 6 characters'),
    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password does not match',
    path: ['confirmPassword'],
  });

export type RegisterPayload = z.infer<typeof registerSchema>;
