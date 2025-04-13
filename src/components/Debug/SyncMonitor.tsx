import React, { useEffect, useState } from 'react';
import { useEntryStore } from '../../stores/entryStore';

export const SyncMonitor: React.FC = () => {
  const { syncStatus, lastSyncError, entries } = useEntryStore();
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [tabId] = useState(() => Math.random().toString(36).slice(2, 9));

  useEffect(() => {
    setLastUpdate(new Date());
  }, [entries]);

  return (
    <div className="fixed bottom-4 left-4 p-4 bg-gray-900 bg-opacity-90 text-white rounded-lg text-sm space-y-2">
      <div className="flex items-center gap-2">
        <span>Tab ID: {tabId}</span>
        <span className={`px-2 py-0.5 rounded text-xs ${
          syncStatus === 'synced' ? 'bg-green-500' : 
          syncStatus === 'error' ? 'bg-red-500' : 'bg-yellow-500'
        }`}>
          {syncStatus}
        </span>
      </div>
      {lastUpdate && (
        <div>Last Update: {lastUpdate.toLocaleTimeString()}</div>
      )}
      {lastSyncError && (
        <div className="text-red-400">{lastSyncError}</div>
      )}
      <div>Entries: {entries.length}</div>
    </div>
  );
};
