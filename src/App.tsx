import React from "react";
import { Route, Routes } from "react-router-dom";
import { PageLayout } from "./components/Layout/PageLayout";
import { ProfileForm } from "./components/Profile/ProfileForm";
import { EntryBoard } from "./components/Entry/EntryBoard";
import { FilterPanel } from "./components/Filter/FilterPanel";

const MainLayout = () => {
  const leftColumn = (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile</h2>
      <ProfileForm />
    </div>
  );

  const centerColumn = (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Entries</h2>
      <EntryBoard />
    </div>
  );

  const rightColumn = (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Filters</h2>
      <FilterPanel 
        onFiltersChange={filters => {
          console.log('Filters updated:', filters);
        }}
      />
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
