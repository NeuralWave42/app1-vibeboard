import React, { useCallback } from 'react';
import { useProfileStore } from '../../stores/profileStore';
import { useEntryStore } from '../../stores/entryStore';
import { VibeSelector } from './VibeSelector';

export const ProfileForm = () => {
  const { profile, updateProfile } = useProfileStore();
  const { addEntry } = useEntryStore();

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        updateProfile({ avatarUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  }, [updateProfile]);

  const handleCreateEntry = useCallback(() => {
    if (profile.name && profile.activity) {
      addEntry({
        authorName: profile.name,
        authorPic: profile.avatarUrl,
        activity: profile.activity,
        vibe: profile.vibe,
        budget: profile.budget
      });

      // Clear the activity field after creating entry
      updateProfile({ activity: '' });
    }
  }, [profile, addEntry, updateProfile]);

  return (
    <form className="space-y-6 max-w-lg">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          value={profile.name}
          onChange={(e) => updateProfile({ name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Profile Picture
        </label>
        <div className="flex items-center space-x-4">
          {profile.avatarUrl && (
            <img
              src={profile.avatarUrl}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          What do you want to do this week?
        </label>
        <input
          type="text"
          value={profile.activity}
          onChange={(e) => updateProfile({ activity: e.target.value })}
          placeholder="e.g., Working on a project, Learning React..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Current Vibe
        </label>
        <VibeSelector
          value={profile.vibe}
          onChange={(vibe) => updateProfile({ vibe })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Budget (£)
        </label>
        <input
          type="number"
          min="0"
          step="0.01"
          value={profile.budget}
          onChange={(e) => updateProfile({ budget: parseFloat(e.target.value) || 0 })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={handleCreateEntry}
          disabled={!profile.name || !profile.activity}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create Entry
        </button>
      </div>
    </form>
  );
};
