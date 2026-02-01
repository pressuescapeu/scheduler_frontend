import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormData } from '@/schemas/authSchemas';
import { useRegister } from '@/hooks/api/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const RegisterForm = () => {
  const { mutate: register, isPending, error } = useRegister();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      year_of_study: 1,
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    register(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input {...registerField('email')} id="email" type="email" placeholder="student@nu.edu.kz" />
        {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input 
            {...registerField('password')} 
            id="password" 
            type={showPassword ? 'text' : 'password'} 
            placeholder="Min 8 characters"
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && <p className="text-sm text-destructive mt-1">{errors.password.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="first_name">First Name</Label>
          <Input {...registerField('first_name')} id="first_name" placeholder="John" />
          {errors.first_name && <p className="text-sm text-destructive mt-1">{errors.first_name.message}</p>}
        </div>

        <div>
          <Label htmlFor="last_name">Last Name</Label>
          <Input {...registerField('last_name')} id="last_name" placeholder="Doe" />
          {errors.last_name && <p className="text-sm text-destructive mt-1">{errors.last_name.message}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="student_id">Student ID</Label>
        <Input {...registerField('student_id')} id="student_id" placeholder="123456789" />
        {errors.student_id && <p className="text-sm text-destructive mt-1">{errors.student_id.message}</p>}
      </div>

      <div>
        <Label htmlFor="year_of_study">Year of Study</Label>
        <Select onValueChange={(value) => setValue('year_of_study', parseInt(value))} defaultValue="1">
          <SelectTrigger>
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1st Year</SelectItem>
            <SelectItem value="2">2nd Year</SelectItem>
            <SelectItem value="3">3rd Year</SelectItem>
            <SelectItem value="4">4th Year</SelectItem>
            <SelectItem value="5">5th Year</SelectItem>
          </SelectContent>
        </Select>
        {errors.year_of_study && <p className="text-sm text-destructive mt-1">{errors.year_of_study.message}</p>}
      </div>

      {error && (
        <div className="text-sm text-destructive">
          {error instanceof Error ? error.message : 'Registration failed'}
        </div>
      )}

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Register
      </Button>

      <div className="text-center text-sm">
        Already have an account?{' '}
        <Link to="/login" className="text-primary hover:underline">
          Login
        </Link>
      </div>
    </form>
  );
};
