import { ScheduleHeader } from './ScheduleHeader';
import { TimeColumn } from './TimeColumn';
import { ScheduleBlock } from './ScheduleBlock';
import { useScheduleGrid } from '@/hooks/useScheduleGrid';
import type { SectionWithDetails } from '@/types';

interface ScheduleGridProps {
  sections: SectionWithDetails[];
}

export const ScheduleGrid = ({ sections }: ScheduleGridProps) => {
  const { gridBlocks } = useScheduleGrid(sections);

  return (
    <div className="w-full overflow-auto">
      {sections.length === 0 ? (
        // Empty state
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="text-lg font-medium text-muted-foreground">
            No courses yet
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            Add courses from the search page to build your schedule
          </div>
        </div>
      ) : (
        <div className="min-w-[800px]">
          {/* Header with day labels */}
          <ScheduleHeader />

          {/* Main grid container */}
          <div className="relative grid grid-cols-[60px_repeat(6,1fr)] grid-rows-[repeat(30,30px)] border-l border-t">
            {/* Time labels column */}
            <TimeColumn />

            {/* Grid cells background */}
            {Array.from({ length: 30 }).map((_, rowIndex) =>
              Array.from({ length: 6 }).map((_, colIndex) => (
                <div
                  key={`cell-${rowIndex}-${colIndex}`}
                  className="border-r border-b bg-card hover:bg-accent/50 transition-colors"
                  style={{
                    gridRow: rowIndex + 1,
                    gridColumn: colIndex + 2,
                  }}
                />
              ))
            )}

            {/* Course blocks overlay */}
            {gridBlocks.map((block, index) => (
              <ScheduleBlock
                key={`${block.section.id}-${block.column}-${index}`}
                section={block.section}
                startRow={block.startRow}
                endRow={block.endRow}
                column={block.column}
                color={block.color}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
