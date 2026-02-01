import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '@/schemas/authSchemas';
import { useLogin } from '@/hooks/api/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const LoginForm = () => {
  const { mutate: login, isPending, error } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          {...register('email')}
          id="email"
          type="email"
          placeholder="student@nu.edu.kz"
        />
        {errors.email && (
          <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            {...register('password')}
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
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
        {errors.password && (
          <p className="text-sm text-destructive mt-1">{errors.password.message}</p>
        )}
      </div>

      {error && (
        <div className="text-sm text-destructive">
          {error instanceof Error ? error.message : 'Login failed'}
        </div>
      )}

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Login
      </Button>

      <div className="text-center text-sm">
        Don't have an account?{' '}
        <Link to="/register" className="text-primary hover:underline">
          Register
        </Link>
      </div>
    </form>
  );
};
