import { create } from 'zustand';
import { sync } from '@tonk/keepsync';

interface Profile {
  name: string;
  bio: string;
  avatarUrl?: string;
  budget: number;
  vibe: string;
}

interface ProfileState {
  profile: Profile;
  updateProfile: (updates: Partial<Profile>) => void;
}

export const useProfileStore = create<ProfileState>(
  sync(
    (set) => ({
      profile: {
        name: 'John Doe',
        bio: 'A passionate developer',
        budget: 0,
        vibe: 'Excited'
      },
      updateProfile: (updates) => set((state) => ({
        profile: { ...state.profile, ...updates }
      }))
    }),
    {
      docId: 'user-profile'
    }
  )
);
