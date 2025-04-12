import React, { useState } from "react";
import ProfileSection from "../components/Profile/ProfileSection";
import ProfileDisplay from "../components/Profile/ProfileDisplay";
import EntryCard from "../components/Entry/EntryCard";
import EntryForm from "../components/Entry/EntryForm";

/**
 * Main board view component that displays the collaborative workspace
 */
const BoardView = () => {
    const [testEntries, setTestEntries] = useState<{
        forms: { text: string; vibe: string }[];
        currentForm: { text: string; vibe: string } | null;
    }>({
        forms: [],
        currentForm: null
    });

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

    const handleFormSubmit = (entry: { text: string; vibe: string }) => {
        setTestEntries(prev => ({
            forms: [...prev.forms, entry],
            currentForm: entry
        }));
    };

    return (
        <main className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                
                {/* Profile Section */}
                <div className="border-b border-gray-300 pb-4">
                    <h2 className="text-lg font-medium text-gray-700 mb-2">ProfileSection Component</h2>
                    <ProfileSection />
                </div>

                {/* Profile Display */}
                <div className="border-b border-gray-300 pb-4">
                    <h2 className="text-lg font-medium text-gray-700 mb-2">ProfileDisplay Component</h2>
                    <ProfileDisplay {...profile} />
                </div>

                {/* Entry Form */}
                <div className="border-b border-gray-300 pb-4">
                    <h2 className="text-lg font-medium text-gray-700 mb-2">EntryForm Component</h2>
                    <section className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">New Entry</h2>
                        <EntryForm onSubmit={handleFormSubmit} />
                        
                        {/* Test Output Display */}
                        {(testEntries.currentForm || testEntries.forms.length > 0) && (
                            <div className="mt-6 space-y-4">
                                {/* Current Form Data */}
                                {testEntries.currentForm && (
                                    <div className="border-b border-gray-200 pb-4">
                                        <h3 className="text-sm font-medium text-gray-500 mb-2">
                                            Latest Submission
                                        </h3>
                                        <div className="bg-blue-50 p-4 rounded-md">
                                            <pre className="text-sm text-blue-700 whitespace-pre-wrap">
                                                {JSON.stringify(testEntries.currentForm, null, 2)}
                                            </pre>
                                        </div>
                                    </div>
                                )}

                                {/* Historical Form Data */}
                                {testEntries.forms.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 mb-2">
                                            Previous Submissions ({testEntries.forms.length})
                                        </h3>
                                        <div className="space-y-2">
                                            {testEntries.forms.map((entry, index) => (
                                                <div 
                                                    key={index}
                                                    className="bg-gray-50 p-4 rounded-md border border-gray-200"
                                                >
                                                    <div className="text-xs text-gray-500 mb-1">
                                                        Form submission #{testEntries.forms.length - index}
                                                    </div>
                                                    <pre className="text-sm text-gray-600 whitespace-pre-wrap">
                                                        {JSON.stringify(entry, null, 2)}
                                                    </pre>
                                                </div>
                                            )).reverse()}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </section>
                </div>

                {/* Entry List */}
                <div className="border-b border-gray-300 pb-4">
                    <h2 className="text-lg font-medium text-gray-700 mb-2">EntryCard Component</h2>
                    <section className="space-y-6">
                        <h2 className="text-xl font-semibold text-gray-900">Recent Entries</h2>
                        <EntryCard {...sampleEntry} />
                    </section>
                </div>
            </div>
        </main>
    );
};

export default BoardView;
