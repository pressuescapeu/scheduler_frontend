import { PageLayout } from '@/components/layout/PageLayout';
import { ScheduleGrid } from '@/components/schedule/ScheduleGrid';
import { useSchedule } from '@/hooks/api/useSchedules';
import { scheduleStore } from '@/store/scheduleStore';
import { Spinner } from '@/components/ui/spinner';
import { ErrorMessage } from '@/components/ui/error-message';

export default function DashboardPage() {
  const selectedScheduleId = scheduleStore((state) => state.selectedScheduleId);
  const { data: scheduleData, isLoading, error, refetch } = useSchedule(selectedScheduleId);

  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Schedule</h1>
            <p className="text-muted-foreground mt-1">
              {scheduleData?.schedule_name || 'Select a schedule to get started'}
            </p>
          </div>
          {scheduleData && (
            <div className="text-sm">
              <span className="font-medium">{scheduleData.total_credits}</span> credits
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Spinner />
          </div>
        ) : error ? (
          <ErrorMessage
            title="Failed to load schedule"
            message={error instanceof Error ? error.message : 'An error occurred'}
            onRetry={() => refetch()}
          />
        ) : (
          <ScheduleGrid sections={scheduleData?.sections || []} />
        )}
      </div>
    </PageLayout>
  );
}
