import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { courseSearchSchema, type CourseSearchFormData } from '@/schemas/courseSchemas';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';

interface CourseSearchProps {
  onSearch: (data: CourseSearchFormData) => void;
}

export const CourseSearch = ({ onSearch }: CourseSearchProps) => {
  const {
    register,
    handleSubmit,
    setValue,
  } = useForm<CourseSearchFormData>({
    resolver: zodResolver(courseSearchSchema),
    defaultValues: {
      level: 'Undergraduate',
      semester: 'Spring 2026',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSearch)} className="space-y-4">
      <div>
        <Label htmlFor="query">Search</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            {...register('query')}
            id="query"
            placeholder="Course abbr (ex. CSCI 152) or title"
            className="pl-10"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="level">Level</Label>
        <Select onValueChange={(value) => setValue('level', value as any)} defaultValue="Undergraduate">
          <SelectTrigger>
            <SelectValue placeholder="Select level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Undergraduate">Undergraduate</SelectItem>
            <SelectItem value="Master">Master</SelectItem>
            <SelectItem value="PhD">PhD</SelectItem>
            <SelectItem value="Doctor of Medicine">Doctor of Medicine</SelectItem>
            <SelectItem value="Zero Years of Master's Programs">Zero Years of Master's Programs</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="semester">Semester</Label>
        <Select onValueChange={(value) => setValue('semester', value)} defaultValue="Spring 2026">
          <SelectTrigger>
            <SelectValue placeholder="Select semester" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Spring 2026">Spring 2026</SelectItem>
            <SelectItem value="Fall 2025">Fall 2025</SelectItem>
            <SelectItem value="Summer 2025">Summer 2025</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full">
        <Search className="mr-2 h-4 w-4" />
        Search Courses
      </Button>
    </form>
  );
};
