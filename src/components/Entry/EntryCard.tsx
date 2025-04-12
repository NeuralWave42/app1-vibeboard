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
    <article className="w-full bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Avatar */}
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={name}
              className="w-10 h-10 rounded-full object-cover border border-gray-100 flex-shrink-0"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-blue-600">
                {name.charAt(0)}
              </span>
            </div>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {name}
              </h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
                {vibe}
              </span>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2 mb-1">
              {activity}
            </p>
            <p className="text-xs text-gray-400">
              Budget: £{budget.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};
