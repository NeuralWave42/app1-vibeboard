import React from 'react';
import EntryCard from './EntryCard';

export interface Entry {
  id: string;
  text: string;
  vibe: string;
  author: {
    name: string;
    avatarUrl?: string;
  };
}

interface EntryListProps {
  entries: Entry[];
}

const SAMPLE_ENTRIES: Entry[] = [
  {
    id: '1',
    text: "Just completed a major milestone! The team's dedication made it happen. 🎉",
    vibe: "Accomplished",
    author: {
      name: "Sarah Chen",
      avatarUrl: "https://i.pravatar.cc/300?img=1"
    }
  },
  {
    id: '2',
    text: "Learning new frameworks today. TypeScript is becoming my new best friend! 💻",
    vibe: "Focused",
    author: {
      name: "Alex Rivera"
    }
  },
  {
    id: '3',
    text: "Great brainstorming session with the design team. So many creative ideas flowing! ✨",
    vibe: "Inspired",
    author: {
      name: "Jordan Lee",
      avatarUrl: "https://i.pravatar.cc/300?img=3"
    }
  }
];

const EntryList: React.FC<EntryListProps> = ({ entries = SAMPLE_ENTRIES }) => {
  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <EntryCard
          key={entry.id}
          text={entry.text}
          vibe={entry.vibe}
          author={entry.author}
        />
      ))}
    </div>
  );
};

export default EntryList;
