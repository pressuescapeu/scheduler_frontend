import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Student } from '@/types';

interface AuthState {
  token: string | null;
  user: Student | null;
  setAuth: (token: string, user: Student) => void;
  logout: () => void;
}

export const authStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: (token, user) => set({ token, user }),
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
