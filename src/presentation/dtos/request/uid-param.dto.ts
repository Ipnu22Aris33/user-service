import { z } from 'zod';

export const UidParamRequestSchema = z.object({
  uid: z.uuid({ message: 'UID harus berupa UUID v4 yang valid' }),
});

export type UidParamRequestDTO = z.infer<typeof UidParamRequestSchema>;
