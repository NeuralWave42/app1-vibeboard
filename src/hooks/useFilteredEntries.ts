import { useMemo } from 'react';
import { useEntryStore } from '../stores/entryStore';
import type { Entry } from '../types/entry';

interface FilterState {
  vibes?: string[];
  participants?: string[];
  budget?: {
    min: number;
    max: number;
  } | null;
}

export const useFilteredEntries = (filters: FilterState = {}) => {
  const entries = useEntryStore((state) => state.entries);

  return useMemo(() => {
    if (!entries?.length) return [];

    return entries.filter((entry: Entry) => {
      // Vibe filter - case insensitive
      if (filters.vibes?.length) {
        const entryVibe = entry.vibe?.toLowerCase().trim();
        const matchingVibes = filters.vibes.map(v => v.toLowerCase().trim());
        if (!entryVibe || !matchingVibes.includes(entryVibe)) {
          return false;
        }
      }

      // Participant filter - case insensitive
      if (filters.participants?.length) {
        const entryAuthor = entry.authorName?.toLowerCase().trim();
        const matchingParticipants = filters.participants.map(p => p.toLowerCase().trim());
        if (!entryAuthor || !matchingParticipants.includes(entryAuthor)) {
          return false;
        }
      }

      // Budget filter
      if (filters.budget) {
        const { min, max } = filters.budget;
        const entryBudget = Number(entry.budget) || 0;
        
        if (entryBudget < min || (max !== Infinity && entryBudget > max)) {
          return false;
        }
      }

      return true;
    });
  }, [entries, filters.vibes, filters.participants, filters.budget]);
};
