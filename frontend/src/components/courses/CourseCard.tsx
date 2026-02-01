import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';
import type { Course } from '@/types';

interface CourseCardProps {
  course: Course;
  onViewDetails: () => void;
  isAdded?: boolean;
}

export const CourseCard = ({ course, onViewDetails, isAdded = false }: CourseCardProps) => {
  return (
    <Card className="hover:bg-accent/50 transition-colors">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-primary">{course.course_code}</h3>
            <p className="text-sm text-muted-foreground mt-1">{course.course_name}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onViewDetails}>
            <Info className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Badge variant="secondary">{course.department}</Badge>
          <span>•</span>
          <span>{course.credits} credits</span>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          onClick={onViewDetails}
          className="w-full"
          variant={isAdded ? 'outline' : 'default'}
        >
          {isAdded ? 'View Sections' : 'Add to Schedule'}
        </Button>
      </CardFooter>
    </Card>
  );
};
