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
    const input = e.target.value;
    // Only allow up to 20 characters
    if (input.length > 20) return;
    
    // Clean and normalize the input
    const cleanedVibe = input.trim();
    // Update even while typing, but clean value before saving
    onChange(cleanedVibe);
  };

  return (
    <div className={className}>
      <input 
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Excited, Creative, Curious..."
        className="w-full px-4 py-3 border-2 transition-colors duration-200
          rounded-lg outline-none
          placeholder:text-gray-400 placeholder:italic
          border-gray-200 hover:border-fuchsia-200
          focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-200
          text-gray-800"
        maxLength={20}
      />
      {value?.length > 0 && (
        <p className="mt-1.5 text-xs text-gray-500">
          {20 - value.length} characters remaining
        </p>
      )}
    </div>
  );
};
