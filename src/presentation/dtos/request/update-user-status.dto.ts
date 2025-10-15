import { StatusEnumType } from '@domain/value-objects';
import { z } from 'zod';

export const UpdateUserStatusRequestSchema = z.object({
  status: z.enum(StatusEnumType),
});

export type UpdateUserStatusRequestDTO = z.infer<
  typeof UpdateUserStatusRequestSchema
>;
