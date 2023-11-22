import { z } from 'zod';

export const RegisterSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email address' }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, { message: 'Password must be 6 or more characters long' })
      .max(16, { message: 'password must be 16 or fewer characters long' }),
    username: z
      .string({ required_error: 'username is required' })
      .min(4, { message: 'username must be 4 or more characters long' }),
  }),
});

export const LoginSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email address' }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, { message: 'Password must be 6 or more characters long' })
      .max(16, { message: 'Password must be 16 or fewer characters long' }),
  }),
});
