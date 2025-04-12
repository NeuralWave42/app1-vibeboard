import React from "react";
import ProfileSection from "../components/Profile/ProfileSection";
import ProfileDisplay from "../components/Profile/ProfileDisplay";

/**
 * Main board view component that displays the collaborative workspace
 */
const BoardView = () => {
  // Hardcoded profile data for now
  const profile = {
    name: "John Doe",
    bio: "Frontend developer passionate about React and TypeScript"
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <ProfileSection />
        <ProfileDisplay {...profile} />

        {/* Entry Form Placeholder */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Entry Form</h2>
          <p className="text-gray-600">Entry form placeholder</p>
        </section>

        {/* Entry List Placeholder */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Entry List</h2>
          <p className="text-gray-600">Entry list placeholder</p>
        </section>
      </div>
    </main>
  );
};

export default BoardView;
