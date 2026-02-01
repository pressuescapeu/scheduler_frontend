import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { SectionList } from '@/components/courses/SectionList';
import { useCourse, useCourseSections } from '@/hooks/api/useCourses';
import { useSchedule, useAddSection } from '@/hooks/api/useSchedules';
import { scheduleStore } from '@/store/scheduleStore';
import { useConflictDetection } from '@/hooks/useConflictDetection';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';
import { ArrowLeft } from 'lucide-react';
import type { SectionWithDetails } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const courseId = Number(id);
  
  const [conflictDialogOpen, setConflictDialogOpen] = useState(false);
  const [pendingSection, setPendingSection] = useState<SectionWithDetails | null>(null);

  const selectedScheduleId = scheduleStore((state) => state.selectedScheduleId);
  const { data: course, isLoading: courseLoading } = useCourse(courseId);
  const { data: sections = [], isLoading: sectionsLoading } = useCourseSections(courseId);
  const { data: scheduleData } = useSchedule(selectedScheduleId);
  const { mutate: addSection, isPending: isAdding } = useAddSection();

  const { conflictingSections, hasTimeConflict } = useConflictDetection(
    scheduleData?.sections || [],
    pendingSection
  );

  const selectedSectionIds = (scheduleData?.sections || []).map((s) => s.id);

  // Check for conflicts when pendingSection changes
  useEffect(() => {
    if (!pendingSection) return;

    // Check if section is already in schedule
    if (selectedSectionIds.includes(pendingSection.id)) {
      setPendingSection(null);
      return;
    }

    if (hasTimeConflict) {
      setConflictDialogOpen(true);
    } else if (selectedScheduleId && !isAdding) {
      // No conflicts, automatically add the section
      addSection(
        { scheduleId: selectedScheduleId, sectionId: pendingSection.id },
        {
          onSuccess: () => {
            setPendingSection(null);
          },
          onError: () => {
            setPendingSection(null);
          },
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingSection, hasTimeConflict, selectedSectionIds]);

  const handleAddSection = (section: SectionWithDetails) => {
    if (!selectedScheduleId) {
      alert('Please select a schedule first');
      return;
    }

    setPendingSection(section);
  };

  const handleConfirmAdd = () => {
    if (!selectedScheduleId || !pendingSection) return;

    addSection(
      { scheduleId: selectedScheduleId, sectionId: pendingSection.id },
      {
        onSuccess: () => {
          setPendingSection(null);
          setConflictDialogOpen(false);
        },
      }
    );
  };

  if (courseLoading || sectionsLoading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center py-12">
          <Spinner />
        </div>
      </PageLayout>
    );
  }

  if (!course) {
    return (
      <PageLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold">Course not found</h2>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/courses')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-primary">{course.course_code}</h1>
            <p className="text-lg text-muted-foreground mt-1">{course.course_name}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <Badge variant="secondary">{course.department}</Badge>
          <span className="text-sm text-muted-foreground">{course.credits} credits</span>
          <span className="text-sm text-muted-foreground">{course.level}</span>
          <span className="text-sm text-muted-foreground">{course.semester}</span>
        </div>

        {course.description && (
          <div className="prose prose-sm">
            <p className="text-muted-foreground">{course.description}</p>
          </div>
        )}

        <div>
          <h2 className="text-xl font-semibold mb-4">Available Sections</h2>
          {sections.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No sections available for this course
            </div>
          ) : (
            <SectionList
              sections={sections}
              selectedSectionIds={selectedSectionIds}
              onAddSection={handleAddSection}
            />
          )}
        </div>

        {/* Conflict Dialog */}
        <Dialog open={conflictDialogOpen} onOpenChange={setConflictDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule Conflict Detected</DialogTitle>
              <DialogDescription>
                This section conflicts with the following course(s) in your schedule:
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-2">
              {conflictingSections.map((section) => (
                <div key={section.id} className="p-2 border rounded">
                  <div className="font-medium">
                    {section.course?.course_code || 'Unknown'} - Section {section.section_number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {section.course?.course_name || 'No name'}
                  </div>
                </div>
              ))}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setConflictDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleConfirmAdd} disabled={isAdding}>
                Add Anyway
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageLayout>
  );
}
