import { useMemo } from 'react';
import { useEntryStore } from '../stores/entryStore';
import type { Entry } from '../types/entry';

interface FilterState {
  vibes: string[];
  participants: string[];
  budget: { min: number; max: number; } | null;
}

export const useFilteredEntries = (filters: FilterState) => {
  const entries = useEntryStore((state) => state.entries);

  return useMemo(() => {
    if (!entries?.length) return [];

    return entries.filter((entry: Entry) => {
      // Vibe filter
      if (filters.vibes.length > 0 && !filters.vibes.includes(entry.vibe ?? '')) {
        return false;
      }

      // Participant filter
      if (filters.participants.length > 0 && !filters.participants.includes(entry.authorName)) {
        return false;
      }

      // Budget filter
      if (filters.budget) {
        const { min, max } = filters.budget;
        if (entry.budget < min || entry.budget > max) {
          return false;
        }
      }

      return true;
    });
  }, [entries, filters]);
};
