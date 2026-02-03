import { Button } from '@/components/ui/Button';
import { Plus, RefreshCw, Send } from 'lucide-react';
import { useSchedules, useSchedule, useRemoveSection, useCreateSchedule, useSubmitSchedule } from '@/hooks/api/useSchedules';
import { scheduleStore } from '@/store/scheduleStore';
import { Spinner } from '@/components/ui/spinner';
import { CourseListItem } from '@/components/schedule/CourseListItem';
import { CreditsCounter } from '@/components/schedule/CreditsCounter';
import { EmptyState } from '@/components/schedule/EmptyState';
import { useNavigate } from 'react-router-dom';
import { ScheduleSelector } from '@/components/schedule/ScheduleSelector';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export const Sidebar = () => {
  const navigate = useNavigate();
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);
  const selectedScheduleId = scheduleStore((state) => state.selectedScheduleId);
  const setSelectedScheduleId = scheduleStore((state) => state.setSelectedScheduleId);

  const { data: schedules, isLoading: schedulesLoading } = useSchedules();
  const { data: scheduleData, isLoading: scheduleLoading } = useSchedule(selectedScheduleId);
  const { mutate: removeSection } = useRemoveSection();
  const { mutate: createSchedule, isPending: isCreatingSchedule } = useCreateSchedule();
  const { mutate: submitSchedule, isPending: isSubmitting } = useSubmitSchedule();

  // Auto-create a schedule if none exist
  useEffect(() => {
    if (!schedulesLoading && schedules && schedules.length === 0 && !isCreatingSchedule) {
      createSchedule({
        schedule_name: 'My Schedule',
        description: 'Default schedule',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schedules?.length, schedulesLoading, isCreatingSchedule]);

  // Auto-select first schedule if none selected
  useEffect(() => {
    if (!schedulesLoading && schedules && schedules.length > 0 && !selectedScheduleId) {
      setSelectedScheduleId(schedules[0].id);
    }
  }, [schedules, schedulesLoading, selectedScheduleId, setSelectedScheduleId]);

  const handleAddCourses = () => {
    navigate('/courses');
  };

  const handleReset = () => {
    if (!selectedScheduleId || !scheduleData?.sections) return;
    
    if (confirm('Are you sure you want to remove all courses from this schedule?')) {
      scheduleData.sections.forEach((section) => {
        removeSection({ scheduleId: selectedScheduleId, sectionId: section.id });
      });
    }
  };

  const handleRemoveCourse = (sectionId: number) => {
    if (!selectedScheduleId) return;
    removeSection({ scheduleId: selectedScheduleId, sectionId });
  };

  const handleViewDetails = (sectionId: number) => {
    const section = scheduleData?.sections.find((s) => s.id === sectionId);
    if (section) {
      navigate(`/courses/${section.course_id}`);
    }
  };

  const handleSubmit = () => {
    if (!selectedScheduleId) return;
    submitSchedule(selectedScheduleId, {
      onSuccess: () => {
        setSubmitDialogOpen(false);
      },
    });
  };

  const isSubmitted = scheduleData?.is_submitted || false;
  const hasCourses = scheduleData?.sections && scheduleData.sections.length > 0;

  return (
    <aside className="hidden md:flex md:w-80 md:flex-col md:fixed md:inset-y-0 md:left-0 md:top-14 border-r bg-background">
      <div className="flex flex-col h-full">
        {/* Schedule Selector */}
        <div className="p-4 border-b">
          {schedulesLoading || isCreatingSchedule ? (
            <div className="flex items-center justify-center py-2">
              <Spinner />
            </div>
          ) : (
            <ScheduleSelector />
          )}
        </div>

        {/* Add Courses Button */}
        <div className="p-4 border-b">
          <Button onClick={handleAddCourses} className="w-full" variant="default">
            <Plus className="mr-2 h-4 w-4" />
            Add Courses
          </Button>
        </div>

        {/* Course List */}
        <div className="flex-1 overflow-y-auto p-4">
          {scheduleLoading ? (
            <div className="flex items-center justify-center py-12">
              <Spinner />
            </div>
          ) : scheduleData?.sections && scheduleData.sections.length > 0 ? (
            <>
              <div className="mb-4">
                <CreditsCounter totalCredits={scheduleData.total_credits} />
              </div>
              <div className="space-y-2">
                {scheduleData.sections.map((section) => (
                  <CourseListItem
                    key={section.id}
                    section={section}
                    onRemove={() => handleRemoveCourse(section.id)}
                    onViewDetails={() => handleViewDetails(section.id)}
                  />
                ))}
              </div>
            </>
          ) : (
            <EmptyState
              title="No courses yet"
              description="Add courses to get started"
            />
          )}
        </div>

        {/* Action Buttons */}
        <div className="p-4 border-t space-y-2">
          {isSubmitted ? (
            <div className="space-y-2">
              <div className="text-sm text-center text-muted-foreground bg-green-50 dark:bg-green-950 py-2 px-3 rounded">
                ✓ Schedule Submitted
              </div>
              <Button
                onClick={() => setSubmitDialogOpen(true)}
                className="w-full"
                variant="outline"
              >
                <Send className="mr-2 h-4 w-4" />
                Resubmit Changes
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => setSubmitDialogOpen(true)}
              className="w-full"
              disabled={!hasCourses}
            >
              <Send className="mr-2 h-4 w-4" />
              Submit Schedule
            </Button>
          )}
          <Button
            onClick={handleReset}
            variant="outline"
            className="w-full"
            disabled={!hasCourses}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        {/* Submit Confirmation Dialog */}
        <Dialog open={submitDialogOpen} onOpenChange={setSubmitDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit Schedule</DialogTitle>
              <DialogDescription>
                Are you sure you want to submit this schedule? You won't be able to edit it after submission.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSubmitDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </aside>
  );
};
