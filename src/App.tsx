import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { PageLayout } from "./components/Layout/PageLayout";
import { ProfileForm } from "./components/Profile/ProfileForm";
import { EntryBoard } from "./components/Entry/EntryBoard";
import { FilterPanel } from "./components/Filter/FilterPanel";
import { SectionTitle } from "./components/Layout/SectionTitle";
import { Divider } from "./components/Layout/Divider";
import { useProfileStore } from "./stores/profileStore";
import { useEntryStore } from "./stores/entryStore";
import { StorageDebugPanel } from "./components/Debug/StorageDebugPanel";

const MainLayout = () => {
  const [syncStatus, setSyncStatus] = useState<string>('');

  useEffect(() => {
    console.log('Initial Profile:', useProfileStore.getState().profile);
    console.log('Initial Entries:', useEntryStore.getState().entries);

    const unsubProfile = useProfileStore.subscribe((state) => {
      setSyncStatus(`Last sync: ${new Date().toLocaleTimeString()}`);
      console.log('Profile Updated:', state.profile);
    });

    const unsubEntries = useEntryStore.subscribe((state) => {
      setSyncStatus(`Last sync: ${new Date().toLocaleTimeString()}`);
      console.log('Entries Updated:', state.entries);
    });

    return () => {
      unsubProfile();
      unsubEntries();
    };
  }, []);

  const leftColumn = (
    <div className="h-full flex flex-col space-y-4">
      <SectionTitle title="Profile" />
      <Divider />
      <div className="flex-1 overflow-auto">
        <ProfileForm />
      </div>
    </div>
  );

  const centerColumn = (
    <div className="h-full flex flex-col space-y-4">
      <SectionTitle title="Entries" />
      <Divider />
      <div className="flex-1 overflow-auto">
        <EntryBoard />
      </div>
    </div>
  );

  const rightColumn = (
    <div className="h-full flex flex-col space-y-4">
      <SectionTitle title="Filters" />
      <Divider />
      <div className="flex-1 overflow-auto">
        <FilterPanel 
          onFiltersChange={filters => {
            console.log('Filters updated:', filters);
          }}
        />
      </div>
    </div>
  );

  return (
    <>
      <div className="fixed top-2 right-2 bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm">
        {syncStatus}
      </div>
      <PageLayout
        left={leftColumn}
        center={centerColumn}
        right={rightColumn}
      />
      <StorageDebugPanel />
    </>
  );
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />} />
    </Routes>
  );
};

export default App;
