import React, { useState } from 'react';

export const VIBE_OPTIONS = [
  'Excited',
  'Focused',
  'Relaxed',
  'Creative',
  'Productive',
  'Other'
] as const;

export type VibeOption = typeof VIBE_OPTIONS[number];

interface VibeSelectorProps {
  value: string;
  onChange: (vibe: string) => void;
  className?: string;
}

export const VibeSelector: React.FC<VibeSelectorProps> = ({
  value,
  onChange,
  className = ''
}) => {
  const [isCustom, setIsCustom] = useState(false);
  const [customValue, setCustomValue] = useState('');

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    if (newValue === 'Other') {
      setIsCustom(true);
      setCustomValue('');
    } else {
      setIsCustom(false);
      onChange(newValue);
    }
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customValue.trim()) {
      onChange(customValue.trim());
    }
  };

  return (
    <div className={className}>
      {isCustom ? (
        <form onSubmit={handleCustomSubmit} className="space-y-2">
          <input
            type="text"
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Describe your vibe"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Set Vibe
          </button>
        </form>
      ) : (
        <select
          value={VIBE_OPTIONS.includes(value as VibeOption) ? value : 'Other'}
          onChange={handleSelectChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          {VIBE_OPTIONS.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      )}
    </div>
  );
};
