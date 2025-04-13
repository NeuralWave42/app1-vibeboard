import React, { useState, useCallback } from "react";
import { ProfileForm } from "../components/Profile/ProfileForm";
import { ProfilePreview } from "../components/Profile/ProfilePreview";
import { EntryBoard } from "../components/Entry/EntryBoard";
import { FilterPanel } from "../components/Filter/FilterPanel";
import { VibeFilterDropdown } from "../components/Filter/VibeFilterDropdown";
import { AuthorFilterSelector } from "../components/Filter/AuthorFilterSelector";

interface FilterState {
  vibes: string[];
  participants: string[];
  budget: { min: number; max: number; } | null;
}

const initialFilterState: FilterState = {
  vibes: [],
  participants: [],
  budget: null
};

/**
 * Main board view component that displays the collaborative workspace
 */
const BoardView = () => {
  const [filters, setFilters] = useState<FilterState>(initialFilterState);

  const handleFiltersChange = useCallback((newFilters: FilterState) => {
    console.log('Updating filters:', newFilters);
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Filters</h2>
          <FilterPanel 
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />
        </div>

        {/* Entry Board Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Entry Board</h2>
          <EntryBoard filters={filters} />
        </div>

        {/* Profile Preview */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Preview</h2>
          <ProfilePreview />
        </div>

        {/* Profile Form */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Form</h2>
          <ProfileForm />
        </div>
      </div>
    </main>
  );
};

export default BoardView;
