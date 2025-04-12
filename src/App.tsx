import React from "react";
import { Route, Routes } from "react-router-dom";
import { PageLayout } from "./components/Layout/PageLayout";
import { ProfileForm } from "./components/Profile/ProfileForm";
import { EntryBoard } from "./components/Entry/EntryBoard";
import { FilterPanel } from "./components/Filter/FilterPanel";
import { SectionTitle } from "./components/Layout/SectionTitle";
import { Divider } from "./components/Layout/Divider";

const MainLayout = () => {
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
    <PageLayout
      left={leftColumn}
      center={centerColumn}
      right={rightColumn}
    />
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
