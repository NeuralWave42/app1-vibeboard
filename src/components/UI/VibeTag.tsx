import React from 'react';

export interface VibeTagProps {
  vibe: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const VIBE_COLORS: { [key: string]: string } = {
  Excited: 'bg-pink-50 text-pink-600',
  Grateful: 'bg-green-50 text-green-600',
  Focused: 'bg-blue-50 text-blue-600',
  Calm: 'bg-purple-50 text-purple-600',
  Inspired: 'bg-yellow-50 text-yellow-600',
  Accomplished: 'bg-indigo-50 text-indigo-600',
  default: 'bg-gray-50 text-gray-600'
};

const VibeTag: React.FC<VibeTagProps> = ({ 
  vibe, 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base'
  };

  const colorClass = VIBE_COLORS[vibe] || VIBE_COLORS.default;

  return (
    <span 
      className={`inline-flex items-center font-medium rounded-full ${sizeClasses[size]} ${colorClass} ${className}`}
    >
      {vibe}
    </span>
  );
};

export default VibeTag;
