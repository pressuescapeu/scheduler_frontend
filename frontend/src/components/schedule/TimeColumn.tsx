import { TIME_SLOTS } from '@/utils/timeUtils';

export const TimeColumn = () => {
  return (
    <>
      {TIME_SLOTS.map((time, index) => (
        <div
          key={time}
          className="flex items-start justify-center pt-1 text-xs text-muted-foreground border-r border-b"
          style={{
            gridRow: `${index * 2 + 1} / ${index * 2 + 3}`,
            gridColumn: 1,
          }}
        >
          {time}
        </div>
      ))}
    </>
  );
};
