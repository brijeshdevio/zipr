import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const LoginSchema = z
  .object({
    email: z.email('Invalid email address'),
    password: z
      .string('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .max(50, 'Password must not exceed 50 characters'),
  })
  .strict();

export class LoginDto extends createZodDto(LoginSchema) {}
