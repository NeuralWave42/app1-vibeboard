import React from 'react';

interface SectionTitleProps {
  title: string;
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ 
  title,
  className = ''
}) => {
  return (
    <h2 className={`text-xl font-semibold text-gray-900 mb-6 ${className}`}>
      {title}
    </h2>
  );
};
