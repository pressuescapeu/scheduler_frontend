import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createScheduleSchema, type CreateScheduleFormData } from '@/schemas/scheduleSchemas';
import { useSchedules, useCreateSchedule } from '@/hooks/api/useSchedules';
import { scheduleStore } from '@/store/scheduleStore';
import { Spinner } from '@/components/ui/spinner';

export const ScheduleSelector = () => {
  const [open, setOpen] = useState(false);
  const selectedScheduleId = scheduleStore((state) => state.selectedScheduleId);
  const setSelectedScheduleId = scheduleStore((state) => state.setSelectedScheduleId);

  const { data: schedules, isLoading } = useSchedules();
  const { mutate: createSchedule, isPending: isCreating } = useCreateSchedule();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateScheduleFormData>({
    resolver: zodResolver(createScheduleSchema),
  });

  const handleScheduleChange = (value: string) => {
    if (value === 'new') {
      setOpen(true);
    } else {
      setSelectedScheduleId(Number(value));
    }
  };

  const onSubmit = (data: CreateScheduleFormData) => {
    createSchedule(data, {
      onSuccess: () => {
        setOpen(false);
        reset();
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-2">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label>Schedule</Label>
      <Select
        value={selectedScheduleId?.toString()}
        onValueChange={handleScheduleChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a schedule" />
        </SelectTrigger>
        <SelectContent>
          {schedules?.map((schedule) => (
            <SelectItem key={schedule.id} value={schedule.id.toString()}>
              {schedule.schedule_name}
            </SelectItem>
          ))}
          <SelectItem value="new" className="text-primary">
            <div className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Create New Schedule
            </div>
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Create Schedule Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Schedule</DialogTitle>
            <DialogDescription>
              Create a new schedule to organize your courses.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="schedule_name">Schedule Name</Label>
              <Input
                {...register('schedule_name')}
                id="schedule_name"
                placeholder="e.g., Fall 2026 - Plan A"
              />
              {errors.schedule_name && (
                <p className="text-sm text-destructive mt-1">
                  {errors.schedule_name.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="description">Description (Optional)</Label>
              <Input
                {...register('description')}
                id="description"
                placeholder="Brief description of this schedule"
              />
              {errors.description && (
                <p className="text-sm text-destructive mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isCreating}>
                {isCreating && <Spinner className="mr-2" />}
                Create
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
