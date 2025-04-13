import React from 'react';
import { EntryCard } from './EntryCard';
import { useFilteredEntries } from '../../hooks/useFilteredEntries';
import type { Entry } from '../../types/entry';

interface EntryBoardProps {
  filters?: {
    vibes?: string[];
    participants?: string[];
    budget?: { min: number; max: number; } | null;
  };
}

export const EntryBoard: React.FC<EntryBoardProps> = ({ filters = {} }) => {
  // Normalize filters to ensure they are always defined
  const safeFilters = {
    vibes: filters.vibes ?? [],
    participants: filters.participants ?? [],
    budget: filters.budget ?? null
  };

  const filteredEntries = useFilteredEntries(safeFilters);

  if (!filteredEntries.length) {
    const hasActiveFilters = Boolean(
      safeFilters.vibes.length || 
      safeFilters.participants.length || 
      safeFilters.budget
    );

    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-2">
          {hasActiveFilters ? 'No entries match your filters' : 'No entries yet'}
        </p>
        {hasActiveFilters && (
          <p className="text-sm text-gray-400">Try adjusting your filter settings</p>
        )}
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 auto-rows-max">
      {filteredEntries.map((entry: Entry) => (
        <EntryCard
          key={entry.id}
          name={entry.authorName}
          avatarUrl={entry.authorPic}
          activity={entry.activity}
          vibe={entry.vibe ?? ''}
          budget={entry.budget}
        />
      ))}
    </div>
  );
};
