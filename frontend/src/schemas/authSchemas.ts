import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email format')
    .endsWith('@nu.edu.kz', 'Must be a @nu.edu.kz email'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters'),
});

export const registerSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email format')
    .endsWith('@nu.edu.kz', 'Must be a @nu.edu.kz email'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Must contain at least one number'),
  first_name: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name too long'),
  last_name: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name too long'),
  student_id: z
    .string()
    .min(1, 'Student ID is required')
    .regex(/^\d{9}$/, 'Student ID must be 9 digits'),
  year_of_study: z
    .number()
    .min(1, 'Year must be between 1 and 5')
    .max(5, 'Year must be between 1 and 5'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
