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
    (set, get) => ({
      entries: [],
      syncStatus: 'connecting',
      lastSyncError: undefined,
      lastUpdate: null,
      addEntry: (entry) => {
        const timestamp = new Date();
        const syncId = Math.random().toString(36).substr(2, 9);
        
        console.log(`[Sync:${syncId}] Adding entry from ${window.location.href}`);
        
        set((state) => ({
          entries: [
            {
              ...entry,
              id: crypto.randomUUID(),
              createdAt: timestamp,
              _syncId: syncId // Add tracking ID
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
        console.info(
          `[Tonk] Sync successful on ${window.location.href}\n`,
          `- DocID: ${docId}\n`,
          `- Entries: ${useEntryStore.getState().entries.length}\n`,
          `- Time: ${new Date().toISOString()}`
        );
        useEntryStore.getState().setSyncStatus('synced');
      },
      onError: (error) => {
        console.error(
          `[Tonk] Sync error on ${window.location.href}:`,
          error.message
        );
        useEntryStore.getState().setSyncStatus('error', error.message);
      },
      onInit: () => {
        console.log('[Sync] Initializing...');
        useEntryStore.getState().setSyncStatus('connecting');
      },
      initTimeout: 10000,
      retryDelay: 2000,
      debug: true
    }
  )
);

// Add sync verification helper
export const verifySyncStatus = () => {
  const state = useEntryStore.getState();
  console.info(
    `[Tonk] Store Status:\n`,
    `- Status: ${state.syncStatus}\n`,
    `- Entries: ${state.entries.length}\n`,
    `- Last Update: ${state.lastUpdate?.toISOString()}\n`,
    `- URL: ${window.location.href}`
  );
  return state.syncStatus === 'synced';
};
