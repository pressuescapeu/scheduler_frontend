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
import { MeetingSelector } from '@/components/courses/MeetingSelector';

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const courseId = Number(id);
  
  const [conflictDialogOpen, setConflictDialogOpen] = useState(false);
  const [meetingSelectorOpen, setMeetingSelectorOpen] = useState(false);
  const [pendingSection, setPendingSection] = useState<SectionWithDetails | null>(null);
  const [selectedMeetingId, setSelectedMeetingId] = useState<number | null>(null);

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
    if (!pendingSection || !selectedMeetingId) return;

    // Check if section is already in schedule
    if (selectedSectionIds.includes(pendingSection.id)) {
      setPendingSection(null);
      setSelectedMeetingId(null);
      return;
    }

    if (hasTimeConflict) {
      setConflictDialogOpen(true);
    } else if (selectedScheduleId && !isAdding) {
      // No conflicts, automatically add the section
      addSection(
        { 
          scheduleId: selectedScheduleId, 
          sectionId: pendingSection.id,
          meetingId: selectedMeetingId 
        },
        {
          onSuccess: () => {
            setPendingSection(null);
            setSelectedMeetingId(null);
          },
          onError: () => {
            setPendingSection(null);
            setSelectedMeetingId(null);
          },
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingSection, selectedMeetingId, hasTimeConflict, selectedSectionIds]);

  const handleAddSection = (section: SectionWithDetails) => {
    if (!selectedScheduleId) {
      alert('Please select a schedule first');
      return;
    }

    setPendingSection(section);

    // Handle meeting selection based on count and type
    if (!section.meetings || section.meetings.length === 0) {
      // Internship or no meetings - add directly with null meeting_id
      setSelectedMeetingId(null);
      addSection(
        { scheduleId: selectedScheduleId, sectionId: section.id, meetingId: null },
        {
          onSuccess: () => {
            setPendingSection(null);
          },
        }
      );
    } else if (section.meetings.length === 1) {
      // Single meeting - auto-select
      setSelectedMeetingId(section.meetings[0].id);
    } else {
      // Multiple meetings - check if they're same time (lecture) or different times (lab)
      const uniqueTimes = new Set(
        section.meetings.map((m) => `${m.start_time}-${m.end_time}`)
      );
      
      if (uniqueTimes.size === 1) {
        // Same time on different days (e.g., Mon/Wed/Fri 9:00-9:50) - it's a lecture
        // Add with null meeting_id so backend returns ALL meetings
        setSelectedMeetingId(null);
        addSection(
          { scheduleId: selectedScheduleId, sectionId: section.id, meetingId: null },
          {
            onSuccess: () => {
              setPendingSection(null);
            },
          }
        );
      } else {
        // Different times - lab with options (Mon 2pm OR Tue 3pm)
        // Show selector so student picks one
        setMeetingSelectorOpen(true);
      }
    }
  };

  const handleMeetingSelect = (meetingId: number) => {
    setSelectedMeetingId(meetingId);
    setMeetingSelectorOpen(false);
  };

  const handleConfirmAdd = () => {
    if (!selectedScheduleId || !pendingSection) return;

    addSection(
      { 
        scheduleId: selectedScheduleId, 
        sectionId: pendingSection.id,
        meetingId: selectedMeetingId 
      },
      {
        onSuccess: () => {
          setPendingSection(null);
          setSelectedMeetingId(null);
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

        {/* Meeting Selector Dialog */}
        {pendingSection && (
          <MeetingSelector
            meetings={pendingSection.meetings || []}
            sectionNumber={pendingSection.section_number}
            courseCode={pendingSection.course?.course_code || 'Unknown'}
            isOpen={meetingSelectorOpen}
            onClose={() => {
              setMeetingSelectorOpen(false);
              setPendingSection(null);
            }}
            onSelect={handleMeetingSelect}
          />
        )}

        {/* Conflict Dialog */}
        <Dialog 
          open={conflictDialogOpen} 
          onOpenChange={(open) => {
            setConflictDialogOpen(open);
            if (!open) {
              // User closed/cancelled - clear pending section to prevent re-trigger
              setPendingSection(null);
              setSelectedMeetingId(null);
            }
          }}
        >
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
              <Button 
                variant="outline" 
                onClick={() => {
                  setConflictDialogOpen(false);
                  setPendingSection(null);
                  setSelectedMeetingId(null);
                }}
              >
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
