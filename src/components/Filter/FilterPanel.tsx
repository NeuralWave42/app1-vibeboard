import React, { useState, useCallback, useMemo } from 'react';
import { X } from 'lucide-react';
import { useEntryStore } from '../../stores/entryStore';
import { BudgetSlider } from './BudgetSlider';

interface FilterPanelProps {
  onFiltersChange: (filters: FilterState) => void;
  className?: string;
}

interface FilterState {
  vibes: string[];
  participants: string[];
  budget: {
    min: number;
    max: number;
  } | null;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ 
  onFiltersChange,
  className = ''
}) => {
  const entries = useEntryStore((state) => state.entries);

  // Extract unique vibes from entries only
  const availableVibes = useMemo(() => {
    const vibesSet = new Set(entries.map(entry => entry.vibe));
    return Array.from(vibesSet).filter(Boolean).sort();
  }, [entries]);

  // Extract unique participants from entries
  const availableParticipants = useMemo(() => {
    const participantsSet = new Set(entries.map(entry => entry.authorName));
    return Array.from(participantsSet).filter(Boolean).sort();
  }, [entries]);

  const [filters, setFilters] = useState<FilterState>({
    vibes: [],
    participants: [],
    budget: null
  });

  const [budgetInput, setBudgetInput] = useState({
    min: '',
    max: ''
  });

  const updateFilters = useCallback((newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFiltersChange(updated);
  }, [filters, onFiltersChange]);

  const toggleFilter = useCallback((type: 'vibes' | 'participants', value: string) => {
    const current = filters[type];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    
    updateFilters({ [type]: updated });
  }, [filters, updateFilters]);

  const handleBudgetChange = useCallback(({ min, max }: { min: number; max: number }) => {
    setBudgetInput({ min: min.toString(), max: max.toString() });
  }, []);

  const applyBudgetFilter = useCallback(() => {
    const min = Number(budgetInput.min);
    const max = Number(budgetInput.max);
    
    updateFilters({
      budget: {
        min: min || 0,
        max: max === 1000 ? Infinity : max
      }
    });
  }, [budgetInput, updateFilters]);

  const clearBudgetFilter = useCallback(() => {
    setBudgetInput({ min: '', max: '' });
    updateFilters({ budget: null });
  }, [updateFilters]);

  const clearAllFilters = useCallback(() => {
    setFilters({
      vibes: [],
      participants: [],
      budget: null
    });
    setBudgetInput({ min: '', max: '' });
    onFiltersChange({
      vibes: [],
      participants: [],
      budget: null
    });
  }, [onFiltersChange]);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Filters</h3>
        {(filters.vibes.length > 0 || filters.participants.length > 0 || filters.budget) && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Always show Vibe Filters section */}
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
            <p className="text-sm text-gray-500 italic py-1">No vibes added yet</p>
          )}
        </div>
      </div>

      {/* Participants Filter Section */}
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
            <p className="text-sm text-gray-500 italic py-1">No participants yet</p>
          )}
        </div>
      </div>

      {/* Budget Filter */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700">Budget Range (£)</h4>
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <BudgetSlider
            minValue={Number(budgetInput.min) || 0}
            maxValue={Number(budgetInput.max) || 1000}
            onChange={handleBudgetChange}
            onApply={applyBudgetFilter}
          />
        </div>
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
                  onClick={clearBudgetFilter}
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
