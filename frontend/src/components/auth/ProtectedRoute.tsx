import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { authStore } from '@/store/authStore';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = authStore((state) => state.token);

  if (token === null) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
