import React, { useState } from "react";
import { ProfileForm } from "../components/Profile/ProfileForm";
import { ProfilePreview } from "../components/Profile/ProfilePreview";
import { EntryBoard } from "../components/Entry/EntryBoard";
import { FilterPanel } from "../components/Filter/FilterPanel";
import { VibeFilterDropdown } from "../components/Filter/VibeFilterDropdown";
import { AuthorFilterSelector } from "../components/Filter/AuthorFilterSelector";

/**
 * Main board view component that displays the collaborative workspace
 */
const BoardView = () => {
    const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
    const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);

    const handleAuthorToggle = (author: string) => {
        setSelectedAuthors(prev =>
            prev.includes(author)
                ? prev.filter(a => a !== author)
                : [...prev, author]
        );
    };

    return (
        <main className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Author Filter Test */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Author Filter</h2>
                    <AuthorFilterSelector
                        selectedAuthors={selectedAuthors}
                        onAuthorToggle={handleAuthorToggle}
                        className="max-w-md"
                    />
                </div>

                {/* Vibe Filter Test */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Vibe Filter</h2>
                    <VibeFilterDropdown
                        selectedVibes={selectedVibes}
                        onChange={setSelectedVibes}
                        className="max-w-xs"
                    />
                </div>

                {/* Filters Section */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Filters</h2>
                    <FilterPanel 
                        onFiltersChange={filters => {
                            console.log('Filters updated:', filters);
                        }}
                    />
                </div>

                {/* Entry Board Section */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Entry Board</h2>
                    <EntryBoard />
                </div>

                {/* Profile Preview */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Preview</h2>
                    <ProfilePreview />
                </div>

                {/* Profile Form */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Form</h2>
                    <ProfileForm />
                </div>
            </div>
        </main>
    );
};

export default BoardView;
