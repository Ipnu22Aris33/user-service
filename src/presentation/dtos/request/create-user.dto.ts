import { StatusEnumType } from '@domain/value-objects';
import { z } from 'zod';

export const CreateUserRequestSchema = z.object({
  name: z.string(),
  email: z.email(),
  phoneNumber: z.string(),
  status: z.enum(StatusEnumType).optional()
});

export type CreateUserRequestDTO = z.infer<typeof CreateUserRequestSchema>;
