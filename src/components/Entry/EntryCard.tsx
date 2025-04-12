import React from 'react';

interface EntryCardProps {
  name: string;
  avatarUrl?: string;
  activity: string;
  vibe: string;
  budget: number;
}

export const EntryCard: React.FC<EntryCardProps> = ({
  name,
  avatarUrl,
  activity,
  vibe,
  budget
}) => {
  return (
    <article className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center space-x-4">
        {/* Avatar with fallback */}
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name}
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-lg font-medium text-blue-700">
              {name.charAt(0)}
            </span>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-medium text-gray-900 truncate">
              {name}
            </h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
              {vibe}
            </span>
          </div>

          <div className="space-y-1">
            <p className="text-gray-600">{activity}</p>
            <p className="text-sm text-gray-500">Budget: £{budget.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </article>
  );
};
