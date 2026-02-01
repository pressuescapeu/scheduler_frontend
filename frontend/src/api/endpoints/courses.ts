import { apiClient } from '../client';
import type { Course, SectionWithDetails } from '@/types';

export const coursesApi = {
  getCourses: async (semester?: string): Promise<Course[]> => {
    const params = semester ? { semester } : {};
    const response = await apiClient.get('/courses', { params });
    return response.data;
  },

  getCourseById: async (id: number): Promise<Course> => {
    const response = await apiClient.get(`/courses/${id}`);
    return response.data;
  },

  getCourseSections: async (id: number): Promise<SectionWithDetails[]> => {
    const response = await apiClient.get(`/courses/${id}/sections`);
    return response.data;
  },
};
