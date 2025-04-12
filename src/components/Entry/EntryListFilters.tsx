import React from 'react';

interface EntryListFiltersProps {
  vibes: string[];
  authors: string[];
  selectedVibe: string;
  selectedAuthor: string;
  onVibeChange: (vibe: string) => void;
  onAuthorChange: (author: string) => void;
  onClearFilters: () => void;
  totalEntries: number;
  filteredCount: number;
}

const EntryListFilters: React.FC<EntryListFiltersProps> = ({
  vibes,
  authors,
  selectedVibe,
  selectedAuthor,
  onVibeChange,
  onAuthorChange,
  onClearFilters,
  totalEntries,
  filteredCount,
}) => {
  const hasActiveFilters = selectedVibe || selectedAuthor;

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Vibe
          </label>
          <select
            value={selectedVibe}
            onChange={(e) => onVibeChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Vibes</option>
            {vibes.map(vibe => (
              <option key={vibe} value={vibe}>{vibe}</option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Author
          </label>
          <select
            value={selectedAuthor}
            onChange={(e) => onAuthorChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Authors</option>
            {authors.map(author => (
              <option key={author} value={author}>{author}</option>
            ))}
          </select>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
          >
            Clear Filters
          </button>
        )}
      </div>

      <div className="text-sm text-gray-500">
        Showing {filteredCount} of {totalEntries} entries
      </div>
    </div>
  );
};

export default EntryListFilters;
