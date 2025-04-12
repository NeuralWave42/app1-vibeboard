import React from 'react';
import { EntryCard } from './EntryCard';

const SAMPLE_ENTRIES = [
  {
    name: "Sarah Chen",
    avatarUrl: "https://i.pravatar.cc/150?u=sarah",
    activity: "Building a new design system",
    vibe: "Creative",
    budget: 1500
  },
  {
    name: "Alex Thompson",
    activity: "Learning TypeScript and React",
    vibe: "Focused",
    budget: 800
  },
  {
    name: "Maria Garcia",
    avatarUrl: "https://i.pravatar.cc/150?u=maria",
    activity: "Planning next quarter's roadmap",
    vibe: "Productive",
    budget: 2000
  },
  {
    name: "John Smith",
    activity: "Writing documentation",
    vibe: "Relaxed",
    budget: 500
  }
];

export const EntryBoard = () => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {SAMPLE_ENTRIES.map((entry, index) => (
        <EntryCard key={index} {...entry} />
      ))}
    </div>
  );
};
