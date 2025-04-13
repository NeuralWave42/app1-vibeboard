import React, { useState, useEffect } from 'react';
import { useEntryStore } from '../../stores/entryStore';

export const StorageDebugPanel = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Record<string, Date>>({});
  const { entries, syncStatus, lastSyncError } = useEntryStore();

  useEffect(() => {
    const handleStateChange = () => {
      setLastUpdate(prev => ({
        ...prev,
        entries: new Date()
      }));
    };

    const unsubEntries = useEntryStore.subscribe(handleStateChange);
    return () => {
      unsubEntries();
    };
  }, []);

  return (
    <>
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 right-4 bg-gray-900 text-white px-3 py-1 rounded-lg shadow-lg opacity-75 hover:opacity-100 transition-opacity text-sm z-50"
      >
        {isVisible ? 'Hide Debug' : 'Show Debug'}
      </button>

      {isVisible && (
        <div className="fixed bottom-16 right-4 p-4 bg-gray-900 text-white rounded-lg shadow-lg opacity-75 hover:opacity-100 transition-opacity max-w-md overflow-auto max-h-[80vh]">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-mono">Tonk Storage Debug</h3>
            <button 
              onClick={() => setLastUpdate({})}
              className="text-xs bg-gray-700 px-2 py-1 rounded hover:bg-gray-600"
            >
              Clear History
            </button>
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-sm font-mono">Sync Status:</h3>
            <span className={`px-2 py-0.5 rounded text-xs ${
              syncStatus === 'synced' ? 'bg-green-500' : 
              syncStatus === 'error' ? 'bg-red-500' : 'bg-yellow-500'
            }`}>
              {syncStatus}
            </span>
          </div>
          {lastSyncError && (
            <p className="text-xs text-red-400 mb-2">{lastSyncError}</p>
          )}

          <div className="space-y-4 text-xs font-mono">
            {/* Entries Store Debug */}
            <div>
              <div className="flex justify-between items-center text-blue-400">
                <span>Entries Store (docId: shared-entries)</span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">Count: {entries.length}</span>
                  {lastUpdate.entries && (
                    <span className="text-gray-400 text-[10px]">
                      Updated: {lastUpdate.entries.toLocaleTimeString()}
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-1 p-2 bg-gray-800 rounded">
                <pre className="text-green-400">{JSON.stringify(entries, null, 2)}</pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
