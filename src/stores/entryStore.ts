import { create } from 'zustand';
import { sync } from '@tonk/keepsync';

export interface Entry {
  id: string;
  authorName: string;
  authorPic?: string;
  activity: string;
  vibe: string;
  budget: number;
  createdAt: Date;
}

interface EntryState {
  entries: Entry[];
  addEntry: (entry: Omit<Entry, 'id' | 'createdAt'>) => void;
}

export const useEntryStore = create<EntryState>(
  sync(
    (set) => ({
      entries: [],
      addEntry: (entry) =>
        set((state) => ({
          entries: [
            {
              ...entry,
              id: crypto.randomUUID(),
              createdAt: new Date(),
            },
            ...state.entries,
          ],
        })),
    }),
    {
      docId: 'shared-entries' // Tonk document ID for syncing
    }
  )
);
