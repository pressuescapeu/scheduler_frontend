import { CourseCard } from './CourseCard';
import { Spinner } from '@/components/ui/spinner';
import type { Course } from '@/types';

interface CourseListProps {
  courses: Course[];
  isLoading: boolean;
  onViewDetails: (course: Course) => void;
}

export const CourseList = ({ courses, isLoading, onViewDetails }: CourseListProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner />
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-lg font-medium text-muted-foreground">No courses found</div>
        <div className="text-sm text-muted-foreground mt-1">
          Try adjusting your search filters
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          onViewDetails={() => onViewDetails(course)}
        />
      ))}
    </div>
  );
};
