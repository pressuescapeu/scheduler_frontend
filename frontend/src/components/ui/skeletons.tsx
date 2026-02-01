import { Card, CardContent, CardHeader } from '@/components/ui/card';

export const CourseCardSkeleton = () => (
  <Card>
    <CardHeader>
      <div className="h-6 bg-muted rounded w-24 mb-2 animate-pulse" />
      <div className="h-4 bg-muted rounded w-full animate-pulse" />
    </CardHeader>
    <CardContent>
      <div className="h-4 bg-muted rounded w-32 animate-pulse" />
    </CardContent>
  </Card>
);

export const ScheduleGridSkeleton = () => (
  <div className="space-y-4">
    <div className="h-12 bg-muted rounded animate-pulse" />
    <div className="grid grid-cols-7 gap-2">
      {Array.from({ length: 42 }).map((_, i) => (
        <div key={i} className="h-24 bg-muted rounded animate-pulse" />
      ))}
    </div>
  </div>
);

export const SidebarSkeleton = () => (
  <div className="space-y-3 p-4">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="h-20 bg-muted rounded animate-pulse" />
    ))}
  </div>
);
