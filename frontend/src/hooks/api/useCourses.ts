import { useQuery } from '@tanstack/react-query';
import { coursesApi } from '@/api/endpoints/courses';

export const useCourses = (semester?: string) => {
  return useQuery({
    queryKey: ['courses', semester],
    queryFn: () => coursesApi.getCourses(semester),
  });
};

export const useCourse = (id: number) => {
  return useQuery({
    queryKey: ['course', id],
    queryFn: () => coursesApi.getCourseById(id),
    enabled: !!id,
  });
};

export const useCourseSections = (courseId: number) => {
  return useQuery({
    queryKey: ['courseSections', courseId],
    queryFn: () => coursesApi.getCourseSections(courseId),
    enabled: !!courseId,
  });
};
