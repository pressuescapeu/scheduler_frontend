import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ScheduleState {
  selectedScheduleId: number | null;
  setSelectedScheduleId: (id: number | null) => void;
}

export const scheduleStore = create<ScheduleState>()(
  persist(
    (set) => ({
      selectedScheduleId: null,
      setSelectedScheduleId: (id) => set({ selectedScheduleId: id }),
    }),
    {
      name: 'schedule-storage',
    }
  )
);
