import { apiClient } from '../client';
import type { Schedule, ScheduleWithSections, CreateScheduleRequest } from '@/types';

export const schedulesApi = {
  getSchedules: async (): Promise<Schedule[]> => {
    const response = await apiClient.get('/schedules');
    return response.data;
  },

  getScheduleById: async (id: number): Promise<ScheduleWithSections> => {
    const response = await apiClient.get(`/schedules/${id}`);
    return response.data;
  },

  createSchedule: async (data: CreateScheduleRequest): Promise<Schedule> => {
    const response = await apiClient.post('/schedules', data);
    return response.data;
  },

  deleteSchedule: async (id: number): Promise<void> => {
    await apiClient.delete(`/schedules/${id}`);
  },

  addSection: async (scheduleId: number, sectionId: number, meetingId?: number | null): Promise<void> => {
    await apiClient.post(`/schedules/${scheduleId}/sections`, { 
      section_id: sectionId,
      meeting_id: meetingId 
    });
  },

  removeSection: async (scheduleId: number, sectionId: number): Promise<void> => {
    await apiClient.delete(`/schedules/${scheduleId}/sections/${sectionId}`);
  },

  submitSchedule: async (id: number): Promise<Schedule> => {
    const response = await apiClient.patch(`/schedules/${id}/submit`);
    return response.data;
  },
};
