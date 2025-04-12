import React, { useState, useCallback } from 'react';
import { PageLayout } from '../components/Layout/PageLayout';
import { ProfileForm } from '../components/Profile/ProfileForm';
import { EntryBoard } from '../components/Entry/EntryBoard';
import { FilterPanel } from '../components/Filter/FilterPanel';
import { useProfileStore } from '../stores/profileStore';
import { useEntryStore } from '../stores/entryStore';

const BoardView = () => {
  const { profile } = useProfileStore();
  const { addEntry, filteredEntries } = useEntryStore();
  const [filters, setFilters] = useState({ authors: [], vibes: [] });

  const handleCreateEntry = useCallback(() => {
    if (profile.name && profile.activity) {
      addEntry({
        name: profile.name,
        avatarUrl: profile.avatarUrl,
        activity: profile.activity,
        vibe: profile.vibe,
        budget: profile.budget
      });
    }
  }, [profile, addEntry]);

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  // Left Column - Profile Section
  const leftColumn = (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Your Profile</h2>
      <ProfileForm />
      <button
        onClick={handleCreateEntry}
        disabled={!profile.name || !profile.activity}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        Create Entry
      </button>
    </div>
  );

  // Center Column - Entry Board
  const centerColumn = (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Activity Board</h2>
      <EntryBoard entries={filteredEntries(filters)} />
    </div>
  );

  // Right Column - Filters
  const rightColumn = (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
      <FilterPanel onFiltersChange={handleFiltersChange} />
    </div>
  );

  return (
    <PageLayout
      left={leftColumn}
      center={centerColumn}
      right={rightColumn}
      className="container mx-auto px-4"
    />
  );
};

export default BoardView;
