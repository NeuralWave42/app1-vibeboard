import React from 'react';
import { EntryCard } from './EntryCard';
import { useEntryStore } from '../../stores/entryStore';

export const EntryBoard = () => {
  const { entries } = useEntryStore();

  if (entries.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No entries yet. Create your first entry using the form!
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 auto-rows-max">
      {entries.map((entry) => (
        <EntryCard
          key={entry.id}
          name={entry.authorName}
          avatarUrl={entry.authorPic}
          activity={entry.activity}
          vibe={entry.vibe}
          budget={entry.budget}
        />
      ))}
    </div>
  );
};
