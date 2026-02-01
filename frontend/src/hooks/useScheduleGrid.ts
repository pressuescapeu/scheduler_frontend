import { useMemo } from 'react';
import { timeToGridRow, calculateGridSpan, dayToColumn } from '@/utils/timeUtils';
import type { SectionWithDetails } from '@/types';

interface GridBlock {
  section: SectionWithDetails;
  startRow: number;
  endRow: number;
  column: number;
  color: string;
}

export const useScheduleGrid = (sections: SectionWithDetails[]) => {
  const gridBlocks = useMemo(() => {
    const blocks: GridBlock[] = [];

    sections.forEach((section, index) => {
      const color = generateCourseColor(section.course_id, index);

      section.meetings.forEach((meeting) => {
        const startRow = timeToGridRow(meeting.start_time);
        const span = calculateGridSpan(meeting.start_time, meeting.end_time);
        const endRow = startRow + span;
        const column = dayToColumn(meeting.day_of_week);

        blocks.push({
          section,
          startRow,
          endRow,
          column,
          color,
        });
      });
    });

    return blocks;
  }, [sections]);

  return { gridBlocks };
};

const generateCourseColor = (courseId: number, index: number): string => {
  const colors = [
    '#10B981',
    '#3B82F6',
    '#F59E0B',
    '#EF4444',
    '#8B5CF6',
    '#EC4899',
    '#14B8A6',
  ];
  return colors[courseId % colors.length] || colors[index % colors.length];
};
