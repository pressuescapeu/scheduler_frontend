import type { SectionWithDetails } from '@/types';
import { formatTime } from '@/utils/timeUtils';

interface ScheduleBlockProps {
  section: SectionWithDetails;
  startRow: number;
  endRow: number;
  column: number;
  color: string;
}

export const ScheduleBlock = ({
  section,
  startRow,
  endRow,
  column,
  color,
}: ScheduleBlockProps) => {
  const meeting = section.meetings[0];

  return (
    <div
      className="p-2 rounded border border-white/20 cursor-pointer hover:opacity-90 transition-opacity overflow-hidden"
      style={{
        gridRowStart: startRow,
        gridRowEnd: endRow,
        gridColumn: column + 1,
        backgroundColor: color,
        color: 'white',
      }}
    >
      <div className="text-xs font-semibold">
        {section.course_code} • {section.section_number}
      </div>
      {section.professor_name && (
        <div className="text-xs opacity-90 truncate">
          {section.professor_name}
        </div>
      )}
      <div className="text-xs opacity-75 mt-1">
        {formatTime(meeting.start_time)} - {formatTime(meeting.end_time)}
      </div>
      {meeting.room && (
        <div className="text-xs opacity-75 truncate">{meeting.room}</div>
      )}
    </div>
  );
};
