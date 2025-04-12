import React from 'react';
import { Inbox } from 'lucide-react';

export interface EmptyStateProps {
  message: string;
  icon?: React.ReactNode;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  message,
  icon = <Inbox className="w-12 h-12 text-gray-400" />,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
      <div className="mb-4">
        {icon}
      </div>
      <p className="text-gray-500 text-base">{message}</p>
    </div>
  );
};

export default EmptyState;
