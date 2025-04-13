import React, { useState, useCallback } from 'react';
import { useEntryStore } from '../../stores/entryStore';
import { VibeSelector } from './VibeSelector';

interface ProfileState {
  name: string;
  avatarUrl?: string;
  activity: string;
  vibe: string;
  budget: number;
}

export const ProfileForm = () => {
  const { addEntry } = useEntryStore();
  const [profile, setProfile] = useState<ProfileState>({
    name: '',
    activity: '',
    vibe: 'Excited',
    budget: 0
  });

  const updateProfile = (updates: Partial<ProfileState>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        updateProfile({ avatarUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  }, []);

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
  }, [profile, addEntry]);

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only update if it's a valid number or empty string
    if (value === '' || !isNaN(Number(value))) {
      updateProfile({ budget: value === '' ? 0 : Number(value) });
    }
  };

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
          What's your spontaneous plan for this week?
        </label>
        <input
          type="text"
          value={profile.activity}
          onChange={(e) => updateProfile({ activity: e.target.value })}
          placeholder="e.g., Learn to juggle, Start a blog, Try a new cuisine..."
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
          step="any"
          value={profile.budget || ''} // Use empty string when 0
          onChange={handleBudgetChange}
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
          Share Your Weekly Plan
        </button>
      </div>
    </form>
  );
};
