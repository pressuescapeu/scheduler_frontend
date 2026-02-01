import { apiClient } from '../client';
import type { LoginRequest, RegisterRequest, AuthResponse } from '@/types';

export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await apiClient.get('/users/me');
    return response.data;
  },
};
