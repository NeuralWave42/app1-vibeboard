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
    <main className={`min-h-screen w-full bg-gray-100 ${className}`}>
      {/* Main grid container */}
      <div className="grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 h-screen">
        {/* Left Column - collapses to full width on mobile */}
        <div className="md:col-span-3 lg:col-span-3 bg-white/50 overflow-auto">
          <div className="p-4 h-full">{left}</div>
        </div>

        {/* Center Column - takes most space on desktop */}
        <div className="md:col-span-5 lg:col-span-6 bg-white overflow-auto">
          <div className="p-4 h-full">{center}</div>
        </div>

        {/* Right Column - moves to bottom on mobile/tablet */}
        <div className="md:col-span-8 lg:col-span-3 bg-white/50 overflow-auto order-last">
          <div className="p-4 h-full">{right}</div>
        </div>
      </div>
    </main>
  );
};
