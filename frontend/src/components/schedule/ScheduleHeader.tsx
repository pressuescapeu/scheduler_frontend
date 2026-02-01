import { DAYS } from '@/utils/timeUtils';

export const ScheduleHeader = () => {
  return (
    <div className="sticky top-0 z-10 grid grid-cols-[60px_repeat(6,1fr)] border-b bg-background">
      {/* Empty cell for time column */}
      <div className="border-r" />

      {/* Day labels */}
      {DAYS.map((day) => (
        <div
          key={day}
          className="flex items-center justify-center h-12 font-semibold text-sm border-r"
        >
          {day}
        </div>
      ))}
    </div>
  );
};
