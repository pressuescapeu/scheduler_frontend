// Domain models matching backend API responses

export interface Student {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  student_id: string;
  year_of_study: number;
  created_at: string;
}

export interface Course {
  id: number;
  course_code: string;
  course_name: string;
  credits: number;
  department: string;
  level: string;
  semester: string;
  description?: string;
}

export interface Section {
  id: number;
  course_id: number;
  section_number: string;
  section_type: string;
  professor_name?: string;
  capacity: number;
  enrolled: number;
  available_seats: number;
}

export interface SectionMeeting {
  id: number;
  section_id: number;
  day_of_week: string;
  start_time: string;
  end_time: string;
  room?: string;
  building?: string;
}

export interface SectionWithDetails extends Section {
  course: {
    course_code: string;
    course_name: string;
    credits: number;
  };
  meetings: SectionMeeting[];
  professor?: {
    first_name: string;
    last_name: string;
  };
}

export interface Schedule {
  id: number;
  student_id: number;
  schedule_name: string;
  description?: string;
  is_submitted: boolean;
  created_at: string;
  updated_at: string;
}

export interface ScheduleWithSections extends Schedule {
  sections: SectionWithDetails[];
  total_credits: number;
}
