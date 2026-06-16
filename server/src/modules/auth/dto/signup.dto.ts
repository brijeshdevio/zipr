import z from 'zod';
import { createZodDto } from 'nestjs-zod';

export const SignupSchema = z
  .object({
    name: z
      .string('Name is required')
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name must not exceed 100 characters'),
    email: z.email('Invalid email address'),
    password: z
      .string('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .max(50, 'Password must not exceed 50 characters'),
  })
  .strict();

export class SignupDto extends createZodDto(SignupSchema) {}
