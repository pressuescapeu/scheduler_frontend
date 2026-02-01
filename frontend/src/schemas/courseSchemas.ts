import { z } from 'zod';

export const courseSearchSchema = z.object({
  query: z.string().optional(),
  level: z.enum([
    'Undergraduate',
    'Master',
    'PhD',
    'Doctor of Medicine',
    "Zero Years of Master's Programs",
  ]).optional(),
  semester: z.string().optional(),
});

export type CourseSearchFormData = z.infer<typeof courseSearchSchema>;
