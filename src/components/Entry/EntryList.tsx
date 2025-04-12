import React, { useMemo, useState } from 'react';
import EntryCard from './EntryCard';
import EntryListFilters from './EntryListFilters';
import EmptyState from '../UI/EmptyState';
import { MessageSquare } from 'lucide-react';

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
  entries?: Entry[];
  withFilters?: boolean;
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

const EntryList: React.FC<EntryListProps> = ({ 
  entries = SAMPLE_ENTRIES,
  withFilters = false 
}) => {
  const [selectedVibe, setSelectedVibe] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');

  const { vibes, authors, displayedEntries } = useMemo(() => {
    const vibeSet = new Set(entries.map(entry => entry.vibe));
    const authorSet = new Set(entries.map(entry => entry.author.name));
    
    if (!withFilters) {
      return { 
        vibes: [], 
        authors: [], 
        displayedEntries: entries 
      };
    }

    const filtered = entries.filter(entry => {
      const matchesVibe = !selectedVibe || entry.vibe === selectedVibe;
      const matchesAuthor = !selectedAuthor || entry.author.name === selectedAuthor;
      return matchesVibe && matchesAuthor;
    });

    return {
      vibes: Array.from(vibeSet),
      authors: Array.from(authorSet),
      displayedEntries: filtered
    };
  }, [entries, selectedVibe, selectedAuthor, withFilters]);

  if (displayedEntries.length === 0) {
    return (
      <div className="space-y-6">
        {withFilters && (
          <EntryListFilters
            vibes={vibes}
            authors={authors}
            selectedVibe={selectedVibe}
            selectedAuthor={selectedAuthor}
            onVibeChange={setSelectedVibe}
            onAuthorChange={setSelectedAuthor}
            onClearFilters={() => {
              setSelectedVibe('');
              setSelectedAuthor('');
            }}
            totalEntries={entries.length}
            filteredCount={displayedEntries.length}
          />
        )}
        
        <EmptyState 
          message={
            withFilters && (selectedVibe || selectedAuthor)
              ? "No entries match your filters"
              : "No entries yet. Be the first to share!"
          }
          icon={<MessageSquare className="w-12 h-12 text-gray-400" />}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {withFilters && (
        <EntryListFilters
          vibes={vibes}
          authors={authors}
          selectedVibe={selectedVibe}
          selectedAuthor={selectedAuthor}
          onVibeChange={setSelectedVibe}
          onAuthorChange={setSelectedAuthor}
          onClearFilters={() => {
            setSelectedVibe('');
            setSelectedAuthor('');
          }}
          totalEntries={entries.length}
          filteredCount={displayedEntries.length}
        />
      )}

      <div className="space-y-4">
        {displayedEntries.map((entry) => (
          <EntryCard
            key={entry.id}
            text={entry.text}
            vibe={entry.vibe}
            author={entry.author}
          />
        ))}
      </div>
    </div>
  );
};

export default EntryList;
