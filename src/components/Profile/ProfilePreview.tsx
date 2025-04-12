import React from 'react';
import { useProfileStore } from '../../stores/profileStore';

export const ProfilePreview = () => {
  const { profile } = useProfileStore();

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center space-x-4">
        {profile.avatarUrl ? (
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-xl text-gray-500">{profile.name?.[0]}</span>
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium text-gray-900 truncate">{profile.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
              {profile.vibe}
            </span>
            <span className="text-sm text-gray-500">
              Budget: £{profile.budget?.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
