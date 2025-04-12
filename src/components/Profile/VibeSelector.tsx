import React from 'react';

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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const singleWord = e.target.value.trim().split(/[\s,.-]+/)[0];
    // Only update if there's valid input
    if (singleWord) {
      onChange(singleWord);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Ensure value is not empty on blur
    if (!value.trim()) {
      e.target.focus();
    }
  };

  return (
    <div className={className}>
      <input 
        type="text"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Enter single word vibe..."
        maxLength={20}
        pattern="\S+"
        required
        aria-required="true"
        className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
          !value.trim() ? 'border-red-300' : 'border-gray-300'
        }`}
      />
      <p className={`mt-1 text-xs ${!value.trim() ? 'text-red-500' : 'text-gray-500'}`}>
        {!value.trim() ? 'A single word vibe is required' : 'Enter a single word to describe your vibe'}
      </p>
    </div>
  );
};
