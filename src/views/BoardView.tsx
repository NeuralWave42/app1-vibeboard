import React, { useState } from "react";
import ProfileSection from "../components/Profile/ProfileSection";
import ProfileDisplay from "../components/Profile/ProfileDisplay";
import EntryCard from "../components/Entry/EntryCard";
import EntryForm from "../components/Entry/EntryForm";

/**
 * Main board view component that displays the collaborative workspace
 */
const BoardView = () => {
  const [testEntry, setTestEntry] = useState<{ text: string; vibe: string } | null>(null);

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

        {/* Entry Form */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">New Entry</h2>
          <EntryForm onSubmit={(entry) => setTestEntry(entry)} />
          {testEntry && (
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <pre className="text-sm text-gray-600 whitespace-pre-wrap">
                {JSON.stringify(testEntry, null, 2)}
              </pre>
            </div>
          )}
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
