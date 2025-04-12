import React from "react";
import ProfileSection from "../components/Profile/ProfileSection";
import ProfileDisplay from "../components/Profile/ProfileDisplay";
import EntryCard from "../components/Entry/EntryCard";

/**
 * Main board view component that displays the collaborative workspace
 */
const BoardView = () => {
  // Hardcoded profile data for now
  const profile = {
    name: "John Doe",
    bio: "Frontend developer passionate about React and TypeScript"
  };

  // Sample entry data
  const sampleEntry = {
    text: "Excited to share that our team just shipped a major feature! The collaborative effort and attention to detail really paid off. 🚀",
    vibe: "Excited",
    author: {
      name: "Sarah Chen",
      avatarUrl: "https://i.pravatar.cc/300"
    }
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

        {/* Entry List */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Entries</h2>
          <EntryCard {...sampleEntry} />
        </section>
      </div>
    </main>
  );
};

export default BoardView;
