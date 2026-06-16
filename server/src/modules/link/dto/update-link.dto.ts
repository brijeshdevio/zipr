import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const UpdateLinkSchema = z
  .object({
    longUrl: z.url('Invalid URL'),
  })
  .strict();

export class UpdateLinkDto extends createZodDto(UpdateLinkSchema) {}
