import React, { useState, useEffect } from 'react';
import { useProfileStore } from '../../stores/profileStore';
import { useEntryStore } from '../../stores/entryStore';

export const StorageDebugPanel = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Record<string, Date>>({});
  const profile = useProfileStore((state) => state.profile);
  const entries = useEntryStore((state) => state.entries);

  useEffect(() => {
    const handleStateChange = (store: string) => {
      setLastUpdate(prev => ({
        ...prev,
        [store]: new Date()
      }));
    };

    const unsubProfile = useProfileStore.subscribe(() => handleStateChange('profile'));
    const unsubEntries = useEntryStore.subscribe(() => handleStateChange('entries'));

    return () => {
      unsubProfile();
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
          
          <div className="space-y-4 text-xs font-mono">
            {/* Profile Store Debug */}
            <div>
              <div className="flex justify-between items-center text-blue-400">
                <span>Profile Store (docId: user-profile)</span>
                {lastUpdate.profile && (
                  <span className="text-gray-400 text-[10px]">
                    Updated: {lastUpdate.profile.toLocaleTimeString()}
                  </span>
                )}
              </div>
              <div className="mt-1 p-2 bg-gray-800 rounded">
                <pre className="text-green-400">{JSON.stringify(profile, null, 2)}</pre>
              </div>
            </div>

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
