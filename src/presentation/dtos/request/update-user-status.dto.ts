import { StatusType } from '@domain/value-objects';
import { z } from 'zod';

export const UpdateUserStatusRequestSchema = z.object({
  status: z.enum(StatusType),
});

export type UpdateUserStatusRequestDTO = z.infer<
  typeof UpdateUserStatusRequestSchema
>;
