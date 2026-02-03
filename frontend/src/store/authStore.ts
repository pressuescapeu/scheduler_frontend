import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Student } from '@/types';
import { scheduleStore } from './scheduleStore';

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
      setAuth: (token, user) => {
        // Clear schedule selection when new user logs in
        scheduleStore.getState().setSelectedScheduleId(null);
        set({ token, user });
      },
      logout: () => {
        // Clear schedule selection on logout
        scheduleStore.getState().setSelectedScheduleId(null);
        set({ token: null, user: null });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
