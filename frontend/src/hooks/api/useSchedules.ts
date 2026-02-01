import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { schedulesApi } from '@/api/endpoints/schedules';
import { scheduleStore } from '@/store/scheduleStore';

export const useSchedules = () => {
  return useQuery({
    queryKey: ['schedules'],
    queryFn: schedulesApi.getSchedules,
  });
};

export const useSchedule = (id: number | null) => {
  return useQuery({
    queryKey: ['schedule', id],
    queryFn: () => schedulesApi.getScheduleById(id!),
    enabled: !!id,
  });
};

export const useCreateSchedule = () => {
  const queryClient = useQueryClient();
  const setSelectedScheduleId = scheduleStore((state) => state.setSelectedScheduleId);

  return useMutation({
    mutationFn: schedulesApi.createSchedule,
    onSuccess: (newSchedule) => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
      setSelectedScheduleId(newSchedule.id);
    },
  });
};

export const useDeleteSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: schedulesApi.deleteSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
    },
  });
};

export const useAddSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ scheduleId, sectionId }: { scheduleId: number; sectionId: number }) =>
      schedulesApi.addSection(scheduleId, sectionId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['schedule', variables.scheduleId] });
    },
  });
};

export const useRemoveSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ scheduleId, sectionId }: { scheduleId: number; sectionId: number }) =>
      schedulesApi.removeSection(scheduleId, sectionId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['schedule', variables.scheduleId] });
    },
  });
};
