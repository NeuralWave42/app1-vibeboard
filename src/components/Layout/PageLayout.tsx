import React, { ReactNode } from 'react';

interface PageLayoutProps {
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
  className?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  left,
  center,
  right,
  className = ''
}) => {
  return (
    <main className={`min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-8xl mx-auto">
        {/* Left Column */}
        <div className="lg:col-span-3">
          {left}
        </div>

        {/* Center Column */}
        <div className="lg:col-span-6">
          {center}
        </div>

        {/* Right Column */}
        <div className="lg:col-span-3">
          {right}
        </div>
      </div>
    </main>
  );
};
