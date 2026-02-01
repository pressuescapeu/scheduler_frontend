// API request and response types

import type { Student } from './models';

// Auth
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  student_id: string;
  year_of_study: number;
}

export interface AuthResponse {
  token: string;
  student: Student;
}

// Schedules
export interface CreateScheduleRequest {
  schedule_name: string;
  description?: string;
}

export interface AddSectionRequest {
  section_id: number;
}

// Error response
export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
