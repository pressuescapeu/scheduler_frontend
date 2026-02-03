import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/Button';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { Label } from '@/components/ui/label';
import type { SectionMeeting } from '@/types';

interface MeetingSelectorProps {
  meetings: SectionMeeting[];
  sectionNumber: string;
  courseCode: string;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (meetingId: number) => void;
}

export const MeetingSelector = ({
  meetings,
  sectionNumber,
  courseCode,
  isOpen,
  onClose,
  onSelect,
}: MeetingSelectorProps) => {
  const [selectedMeetingId, setSelectedMeetingId] = useState<number | null>(
    meetings.length === 1 ? meetings[0].id : null
  );

  const handleConfirm = () => {
    if (selectedMeetingId) {
      onSelect(selectedMeetingId);
      onClose();
    }
  };

  const formatTime = (time: string) => {
    return time.substring(0, 5); // "09:00:00" -> "09:00"
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Select Meeting Time for {courseCode} - Section {sectionNumber}
          </DialogTitle>
          <DialogDescription>
            This section has multiple meeting times. Please select the one that fits your schedule.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <RadioGroup
            value={selectedMeetingId?.toString()}
            onValueChange={(value: string) => setSelectedMeetingId(Number(value))}
          >
            <div className="space-y-2">
              {meetings.map((meeting) => (
                <div
                  key={meeting.id}
                  className="flex items-center space-x-2 rounded-lg border p-4 hover:bg-accent cursor-pointer"
                  onClick={() => setSelectedMeetingId(meeting.id)}
                >
                  <RadioGroupItem value={meeting.id.toString()} id={`meeting-${meeting.id}`} />
                  <Label
                    htmlFor={`meeting-${meeting.id}`}
                    className="flex-1 cursor-pointer font-normal"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="font-semibold min-w-[100px]">
                          {meeting.day_of_week}
                        </span>
                        <span className="text-sm">
                          {formatTime(meeting.start_time)} - {formatTime(meeting.end_time)}
                        </span>
                      </div>
                      {(meeting.room || meeting.building) && (
                        <span className="text-sm text-muted-foreground">
                          {meeting.building && `${meeting.building} `}
                          {meeting.room}
                        </span>
                      )}
                    </div>
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!selectedMeetingId}>
            Confirm Selection
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
