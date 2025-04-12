import { create } from 'zustand';

interface Profile {
  name: string;
  bio: string;
}

interface ProfileState {
  profile: Profile;
  updateProfile: (updates: Partial<Profile>) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: {
    name: 'John Doe',
    bio: 'A passionate developer'
  },
  updateProfile: (updates) => set((state) => ({
    profile: { ...state.profile, ...updates }
  }))
}));
