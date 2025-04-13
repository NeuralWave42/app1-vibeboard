import { create } from 'zustand';
import { sync } from '@tonk/keepsync';

interface WeekTimerState {
  weekStartTime: number;
  lastCheck: number;
  checkWeek: () => void;
}

function getWeekBoundaries() {
  const now = new Date();
  // Set to start of current week (Sunday)
  const startOfWeek = new Date(now);
  startOfWeek.setHours(0, 0, 0, 0);
  startOfWeek.setDate(now.getDate() - now.getDay());
  
  return {
    weekStartTime: startOfWeek.getTime(),
    lastCheck: Date.now()
  };
}

export const useWeekTimerStore = create<WeekTimerState>(
  sync(
    (set) => ({
      ...getWeekBoundaries(),
      checkWeek: () => {
        const now = Date.now();
        const state = getWeekBoundaries();
        // Only update if we've crossed into a new week
        if (now - state.weekStartTime >= 7 * 24 * 60 * 60 * 1000) {
          set(state);
        } else {
          set({ lastCheck: now });
        }
      }
    }),
    {
      docId: 'week-timer'
    }
  )
);
