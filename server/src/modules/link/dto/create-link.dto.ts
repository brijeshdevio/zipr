import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const CreateLinkSchema = z
  .object({
    longUrl: z.url('Invalid URL'),
    shortCode: z
      .string()
      .min(4, 'Short code must be at least 4 characters')
      .max(20, 'Short code must not exceed 20 characters')
      .regex(
        /^[a-zA-Z0-9_-]+$/,
        'Short code may contain only letters, numbers, hyphens and underscores',
      )
      .optional(),
  })
  .strict();

export class CreateLinkDto extends createZodDto(CreateLinkSchema) {}
