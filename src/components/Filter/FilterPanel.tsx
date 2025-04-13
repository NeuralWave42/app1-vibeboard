import React, { useCallback, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { useEntryStore } from '../../stores/entryStore';
import { BudgetSlider } from './BudgetSlider';

interface FilterState {
  vibes: string[];
  participants: string[];
  budget: { min: number; max: number; } | null;
}

interface FilterPanelProps {
  filters?: FilterState; // optional so undefined is possible
  onFiltersChange: (filters: FilterState) => void;
  className?: string;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters = { vibes: [], participants: [], budget: null }, // default value provided
  onFiltersChange,
  className = ''
}) => {
  const entries = useEntryStore((state) => state.entries);

  // Extract available options from entries
  const availableVibes = useMemo(() => {
    const vibes = entries?.map(entry => entry?.vibe?.trim()).filter(Boolean) as string[];
    return [...new Set(vibes)].sort();
  }, [entries]);

  const availableParticipants = useMemo(() => {
    const participantsSet = new Set(entries?.map(entry => entry?.authorName).filter(Boolean) ?? []);
    return Array.from(participantsSet).sort();
  }, [entries]);

  const toggleFilter = useCallback((type: 'vibes' | 'participants', value: string) => {
    const current = filters[type];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];

    onFiltersChange({
      ...filters,
      [type]: updated
    });
  }, [filters, onFiltersChange]);

  const handleBudgetChange = useCallback(({ min, max }: { min: number; max: number }) => {
    onFiltersChange({
      ...filters,
      budget: { min, max }
    });
  }, [filters, onFiltersChange]);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Filters</h3>
        {(filters.vibes.length > 0 || filters.participants.length > 0 || filters.budget) && (
          <button
            onClick={() => onFiltersChange({ vibes: [], participants: [], budget: null })}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Vibe Filters */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Vibes</h4>
        <div className="flex flex-wrap gap-2">
          {availableVibes.length > 0 ? (
            availableVibes.map(vibe => (
              <button
                key={vibe}
                onClick={() => toggleFilter('vibes', vibe)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                  ${filters.vibes.includes(vibe)
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {vibe}
              </button>
            ))
          ) : (
            <p className="text-sm text-gray-500 italic py-1">No vibes available</p>
          )}
        </div>
      </div>

      {/* Participant Filters */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Participants</h4>
        <div className="flex flex-wrap gap-2">
          {availableParticipants.length > 0 ? (
            availableParticipants.map(participant => (
              <button
                key={participant}
                onClick={() => toggleFilter('participants', participant)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                  ${filters.participants.includes(participant)
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {participant}
              </button>
            ))
          ) : (
            <p className="text-sm text-gray-500 italic py-1">No participants available</p>
          )}
        </div>
      </div>

      {/* Budget Filter */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Budget Range (£)</h4>
        <BudgetSlider
          minValue={filters.budget?.min || 0}
          maxValue={filters.budget?.max || 1000}
          onChange={handleBudgetChange}
          onApply={() => {}}
        />
      </div>

      {/* Active Filters Summary */}
      {(filters.vibes.length > 0 || filters.participants.length > 0 || filters.budget) && (
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Active Filters</h4>
          <div className="flex flex-wrap gap-2">
            {filters.vibes.map(vibe => (
              <span
                key={vibe}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm bg-blue-100 text-blue-700"
              >
                {vibe}
                <button
                  onClick={() => toggleFilter('vibes', vibe)}
                  className="p-0.5 hover:text-blue-800"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
            {filters.participants.map(participant => (
              <span
                key={participant}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm bg-blue-100 text-blue-700"
              >
                {participant}
                <button
                  onClick={() => toggleFilter('participants', participant)}
                  className="p-0.5 hover:text-blue-800"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
            {filters.budget && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
                £{filters.budget.min} - £{filters.budget.max === Infinity ? '∞' : filters.budget.max}
                <button
                  onClick={() => onFiltersChange({ ...filters, budget: null })}
                  className="p-0.5 hover:text-blue-800"
                >
                  <X size={14} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
