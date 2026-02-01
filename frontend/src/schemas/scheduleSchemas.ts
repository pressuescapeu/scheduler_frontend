import { z } from 'zod';

export const createScheduleSchema = z.object({
  schedule_name: z
    .string()
    .min(1, 'Schedule name is required')
    .max(100, 'Schedule name too long'),
  description: z
    .string()
    .max(500, 'Description too long')
    .optional(),
});

export type CreateScheduleFormData = z.infer<typeof createScheduleSchema>;
