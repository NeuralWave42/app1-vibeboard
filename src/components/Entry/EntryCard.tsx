import React from 'react';
import { useVibeColorStore } from '../../stores/vibeColorStore';
import type { Entry } from '../../types/entry';

interface EntryCardProps extends Omit<Entry, 'id'> {
  // Add any additional props specific to the card
}

export const EntryCard: React.FC<EntryCardProps> = ({
  name,
  avatarUrl,
  activity,
  vibe,
  budget = 0
}) => {
  const getVibeColor = useVibeColorStore(state => state.getVibeColor);
  const vibeColor = vibe ? getVibeColor(vibe) : null;

  return (
    <article className="group bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-100 
      hover:translate-y-[-2px] transition-all duration-300 animate-slide-up">
      <div className="p-4">
        <div className="flex items-start gap-4">
          {/* Avatar section with updated styling */}
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={name}
              className="w-12 h-12 rounded-full object-cover border-2 border-purple-200 shadow-sm"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-100 to-fuchsia-100 
              flex items-center justify-center shadow-sm border-2 border-purple-200">
              <span className="text-lg font-semibold bg-gradient-to-br from-purple-600 to-fuchsia-600 
                bg-clip-text text-transparent">
                {name.charAt(0)}
              </span>
            </div>
          )}

          {/* Content section */}
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-bold text-gray-900 truncate">{name}</h3>
              {vibe && (
                <span 
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: vibeColor ? `${vibeColor}20` : 'bg-gray-100',
                    color: vibeColor ?? 'text-gray-600',
                    borderColor: vibeColor ? `${vibeColor}40` : 'border-gray-200'
                  }}
                >
                  {vibe}
                </span>
              )}
            </div>
            
            <p className="text-base text-gray-700 line-clamp-2 group-hover:text-gray-900 transition-colors">
              {activity}
            </p>
            
            <p className="text-sm font-medium bg-gradient-to-r from-purple-600 to-fuchsia-600 
              bg-clip-text text-transparent">
              Budget: £{budget.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};
