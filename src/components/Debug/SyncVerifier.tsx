import React, { useEffect, useState } from 'react';
import { useEntryStore, verifySyncStatus } from '../../stores/entryStore';

export const SyncVerifier: React.FC = () => {
  const { syncStatus, entries, lastUpdate } = useEntryStore();
  const [tabId] = useState(() => Math.random().toString(36).substr(2, 9));

  useEffect(() => {
    const timer = setInterval(() => {
      verifySyncStatus();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 text-white p-4 rounded-lg text-sm opacity-75 hover:opacity-100">
      <h3 className="font-mono mb-2">Tonk Sync Status</h3>
      <div className="space-y-1 font-mono text-xs">
        <p>Tab ID: {tabId}</p>
        <p>Status: <span className={
          syncStatus === 'synced' ? 'text-green-400' :
          syncStatus === 'error' ? 'text-red-400' : 'text-yellow-400'
        }>{syncStatus}</span></p>
        <p>Entries: {entries.length}</p>
        <p>Last Update: {lastUpdate?.toLocaleTimeString()}</p>
      </div>
    </div>
  );
};
