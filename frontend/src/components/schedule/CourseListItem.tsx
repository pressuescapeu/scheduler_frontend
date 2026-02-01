import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/badge';
import { X, Info } from 'lucide-react';
import type { SectionWithDetails } from '@/types';

interface CourseListItemProps {
  section: SectionWithDetails;
  onRemove: () => void;
  onViewDetails: () => void;
}

export const CourseListItem = ({ section, onRemove, onViewDetails }: CourseListItemProps) => {
  return (
    <div className="p-3 rounded-lg border bg-card hover:bg-accent transition-colors">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm truncate">
            {section.course?.course_code || 'Unknown'} - Section {section.section_number}
          </div>
          <div className="text-xs text-muted-foreground mt-1 truncate">
            {section.course?.course_name || 'No name'}
          </div>
          {section.professor && (
            <div className="text-xs text-muted-foreground mt-1 truncate">
              {section.professor.first_name} {section.professor.last_name}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={onViewDetails}
          >
            <Info className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-destructive hover:text-destructive"
            onClick={onRemove}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};
