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
    <main className={`min-h-screen w-full bg-gradient-to-br from-gray-50 to-white ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 gap-6 h-screen p-4 md:p-6">
        <div className="md:col-span-3 lg:col-span-3 animate-slide-up [animation-delay:100ms]">
          <div className="h-full bg-white/80 backdrop-blur rounded-2xl shadow-lg border border-gray-100 p-4 overflow-auto">
            {left}
          </div>
        </div>

        <div className="md:col-span-5 lg:col-span-6 animate-slide-up [animation-delay:200ms]">
          <div className="h-full bg-white/80 backdrop-blur rounded-2xl shadow-lg border border-gray-100 p-4 overflow-auto">
            {center}
          </div>
        </div>

        <div className="md:col-span-8 lg:col-span-3 animate-slide-up [animation-delay:300ms]">
          <div className="h-full bg-white/80 backdrop-blur rounded-2xl shadow-lg border border-gray-100 p-4 overflow-auto">
            {right}
          </div>
        </div>
      </div>
    </main>
  );
};
