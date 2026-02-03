import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/api/endpoints/auth';
import { authStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const setAuth = authStore((state) => state.setAuth);

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      setAuth(data.token, data.student);
      queryClient.invalidateQueries(); // Refetch all queries after login
      navigate('/dashboard');
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const setAuth = authStore((state) => state.setAuth);

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      setAuth(data.token, data.student);
      queryClient.invalidateQueries(); // Refetch all queries after register
      navigate('/dashboard');
    },
  });
};

export const useCurrentUser = () => {
  const token = authStore((state) => state.token);

  return useQuery({
    queryKey: ['currentUser'],
    queryFn: authApi.getCurrentUser,
    enabled: !!token,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const logout = authStore((state) => state.logout);
  const navigate = useNavigate();

  return () => {
    logout();
    queryClient.clear();
    navigate('/login');
  };
};
