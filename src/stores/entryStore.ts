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
  lastUpdate: Date | null;
  addEntry: (entry: Omit<Entry, 'id' | 'createdAt'>) => void;
  setSyncStatus: (status: 'connecting' | 'synced' | 'error', error?: string) => void;
}

export const useEntryStore = create<EntryState>(
  sync(
    (set) => ({
      entries: [],
      syncStatus: 'connecting',
      lastSyncError: undefined,
      lastUpdate: null,
      addEntry: (entry) => {
        const timestamp = new Date();
        console.log(`[Sync ${timestamp.toISOString()}] Adding entry:`, entry);
        set((state) => ({
          entries: [
            {
              ...entry,
              id: crypto.randomUUID(),
              createdAt: timestamp,
            },
            ...state.entries,
          ],
          lastUpdate: timestamp
        }));
      },
      setSyncStatus: (status, error) => 
        set(state => {
          console.log(`[Sync] Status changed to ${status}${error ? `: ${error}` : ''}`);
          return { 
            syncStatus: status, 
            lastSyncError: error,
            lastUpdate: new Date()
          };
        }),
    }),
    {
      docId: 'shared-entries',
      onSync: (docId) => {
        console.log(`[Sync] Document ${docId} synced successfully`);
        useEntryStore.getState().setSyncStatus('synced');
      },
      onError: (error) => {
        console.error('[Sync] Error:', error);
        useEntryStore.getState().setSyncStatus('error', error.message);
      },
      onInit: () => {
        console.log('[Sync] Initializing...');
        useEntryStore.getState().setSyncStatus('connecting');
      },
      initTimeout: 5000,
      retryDelay: 1000,
      // Enable verbose logging
      debug: process.env.NODE_ENV !== 'production'
    }
  )
);
