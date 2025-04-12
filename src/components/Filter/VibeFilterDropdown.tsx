import React, { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown } from 'lucide-react';

interface VibeFilterDropdownProps {
  selectedVibes: string[];
  onChange: (vibes: string[]) => void;
  className?: string;
}

const VIBE_OPTIONS = [
  'Excited',
  'Focused',
  'Relaxed',
  'Creative',
  'Productive',
  'Other'
];

export const VibeFilterDropdown: React.FC<VibeFilterDropdownProps> = ({
  selectedVibes,
  onChange,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
            {VIBE_OPTIONS.map(vibe => (
              <button
                key={vibe}
                type="button"
                onClick={() => toggleVibe(vibe)}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <span className="w-4 h-4 mr-3 border rounded flex items-center justify-center">
                  {selectedVibes.includes(vibe) && (
                    <Check size={12} className="text-blue-600" />
                  )}
                </span>
                {vibe}
              </button>
            ))}
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
