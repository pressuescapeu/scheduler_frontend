import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { CourseSearch } from '@/components/courses/CourseSearch';
import { CourseList } from '@/components/courses/CourseList';
import { useCourses } from '@/hooks/api/useCourses';
import { ErrorMessage } from '@/components/ui/error-message';
import type { CourseSearchFormData } from '@/schemas/courseSchemas';
import type { Course } from '@/types';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CourseSearchPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState<CourseSearchFormData>({
    query: '',
    level: 'Undergraduate',
    semester: 'Spring 2026',
  });

  const { data: courses = [], isLoading, error, refetch } = useCourses(searchParams.semester);

  // Filter courses based on search query
  const filteredCourses = courses.filter(course => {
    if (!searchParams.query) return true;
    const query = searchParams.query.toLowerCase();
    return (
      course.course_code.toLowerCase().includes(query) ||
      course.course_name.toLowerCase().includes(query)
    );
  });

  const handleSearch = (data: CourseSearchFormData) => {
    setSearchParams(data);
  };

  const handleViewDetails = (course: Course) => {
    navigate(`/courses/${course.id}`);
  };

  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Search Courses</h1>
            <p className="text-muted-foreground mt-1">
              Find and add courses to your schedule
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <CourseSearch onSearch={handleSearch} />
          </div>

          <div className="lg:col-span-3">
            {error ? (
              <ErrorMessage
                title="Failed to load courses"
                message={error instanceof Error ? error.message : 'An error occurred'}
                onRetry={() => refetch()}
              />
            ) : (
              <CourseList
                courses={filteredCourses}
                isLoading={isLoading}
                onViewDetails={handleViewDetails}
              />
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
