import { formatTime, DAY_ABBREVIATIONS } from '@/utils/timeUtils';
import type { SectionMeeting } from '@/types';

interface SectionMeetingInfoProps {
  meetings: SectionMeeting[];
}

export const SectionMeetingInfo = ({ meetings }: SectionMeetingInfoProps) => {
  if (meetings.length === 0) {
    return <span className="text-sm text-muted-foreground">No meeting times</span>;
  }

  return (
    <div className="space-y-1">
      {meetings.map((meeting, index) => (
        <div key={meeting.id || index} className="text-sm">
          <div className="flex items-center gap-2">
            <span className="font-medium">
              {DAY_ABBREVIATIONS[meeting.day_of_week] || meeting.day_of_week}
            </span>
            <span className="text-muted-foreground">
              {formatTime(meeting.start_time)} - {formatTime(meeting.end_time)}
            </span>
          </div>
          {(meeting.room || meeting.building) && (
            <div className="text-muted-foreground">
              {[meeting.room, meeting.building].filter(Boolean).join(', ')}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
