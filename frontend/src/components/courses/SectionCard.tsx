import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Check } from 'lucide-react';
import type { SectionWithDetails } from '@/types';
import { formatTime, DAY_ABBREVIATIONS } from '@/utils/timeUtils';

interface SectionCardProps {
  section: SectionWithDetails;
  onAdd: () => void;
  isSelected: boolean;
}

export const SectionCard = ({ section, onAdd, isSelected }: SectionCardProps) => {
  const meeting = section.meetings[0];

  return (
    <Card className={isSelected ? 'border-primary' : ''}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant={section.section_type === 'Lecture' ? 'default' : 'secondary'}>
                {section.section_type}
              </Badge>
              <span className="text-sm font-medium">Section {section.section_number}</span>
            </div>

            {section.professor_name && (
              <p className="text-sm text-muted-foreground">{section.professor_name}</p>
            )}

            {meeting && (
              <div className="text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <span>{DAY_ABBREVIATIONS[meeting.day_of_week]}</span>
                  <span>•</span>
                  <span>
                    {formatTime(meeting.start_time)} - {formatTime(meeting.end_time)}
                  </span>
                </div>
                {meeting.room && (
                  <div className="text-muted-foreground mt-1">
                    {meeting.room}
                    {meeting.building && `, ${meeting.building}`}
                  </div>
                )}
              </div>
            )}

            <div className="text-sm text-muted-foreground">
              {section.available_seats > 0 ? (
                <span className="text-green-500">
                  {section.available_seats}/{section.capacity} seats available
                </span>
              ) : (
                <span className="text-red-500">Full</span>
              )}
            </div>
          </div>

          <Button
            onClick={onAdd}
            size="sm"
            variant={isSelected ? 'outline' : 'default'}
            disabled={isSelected}
          >
            {isSelected ? (
              <>
                <Check className="mr-1 h-4 w-4" />
                Added
              </>
            ) : (
              <>
                <Plus className="mr-1 h-4 w-4" />
                Add
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
