import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { useEntryStore } from '../../stores/entryStore';
import { useProfileStore } from '../../stores/profileStore';
import { useVibeColorStore } from '../../stores/vibeColorStore';

interface VibeFilterDropdownProps {
  selectedVibes: string[];
  onChange: (vibes: string[]) => void;
  className?: string;
}

// Remove VIBE_OPTIONS constant as we'll get vibes dynamically
export const VibeFilterDropdown: React.FC<VibeFilterDropdownProps> = ({
  selectedVibes,
  onChange,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const entries = useEntryStore((state) => state.entries);
  const profile = useProfileStore((state) => state.profile);
  const getVibeColor = useVibeColorStore(state => state.getVibeColor);

  // Extract unique vibes safely with null checks
  const availableVibes = useMemo(() => {
    const vibes = entries?.map(entry => entry?.vibe).filter(Boolean) ?? [];
    const vibesSet = new Set(vibes);
    if (profile?.vibe) {
      vibesSet.add(profile.vibe);
    }
    return Array.from(vibesSet).sort();
  }, [entries, profile?.vibe]);

  const toggleVibe = (vibe: string) => {
    const newSelection = selectedVibes.includes(vibe)
      ? selectedVibes.filter(v => v !== vibe)
      : [...selectedVibes, vibe];
    onChange(newSelection);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2 text-left text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50"
      >
        <span className="flex-1 truncate">
          {selectedVibes.length === 0 
            ? 'Select vibes...'
            : `${selectedVibes.length} selected`}
        </span>
        <ChevronDown
          size={16}
          className={`transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
          <div className="py-1">
            {availableVibes.map(vibe => {
              const color = getVibeColor(vibe);
              return (
                <button
                  key={vibe}
                  onClick={() => toggleVibe(vibe)}
                  className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-50"
                  style={{
                    color: selectedVibes.includes(vibe) ? color : 'inherit',
                  }}
                >
                  <span className="w-4 h-4 mr-3 border rounded flex items-center justify-center"
                    style={{
                      borderColor: color,
                      backgroundColor: selectedVibes.includes(vibe) ? `${color}20` : 'transparent'
                    }}
                  >
                    {selectedVibes.includes(vibe) && (
                      <Check size={12} style={{ color }} />
                    )}
                  </span>
                  {vibe}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {selectedVibes.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedVibes.map(vibe => (
            <span
              key={vibe}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700"
            >
              {vibe}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
