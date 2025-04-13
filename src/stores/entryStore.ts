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
  syncStatus: 'connecting' | 'synced' | 'error';
  lastSyncError?: string;
  addEntry: (entry: Omit<Entry, 'id' | 'createdAt'>) => void;
  setSyncStatus: (status: 'connecting' | 'synced' | 'error', error?: string) => void;
}

export const useEntryStore = create<EntryState>(
  sync(
    (set) => ({
      entries: [],
      syncStatus: 'connecting',
      lastSyncError: undefined,
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
      setSyncStatus: (status, error) => 
        set({ syncStatus: status, lastSyncError: error }),
    }),
    {
      docId: 'shared-entries',
      onSync: () => useEntryStore.getState().setSyncStatus('synced'),
      onError: (error) => useEntryStore.getState().setSyncStatus('error', error.message),
      initTimeout: 5000, // 5 second timeout for initial sync
      retryDelay: 1000, // 1 second delay between retries
    }
  )
);
