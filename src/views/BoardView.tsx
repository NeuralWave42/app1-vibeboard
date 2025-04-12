import React, { useState } from "react";
import { FileQuestion } from 'lucide-react';
import { ProfileForm } from "../components/Profile/ProfileForm";

/**
 * Main board view component that displays the collaborative workspace
 */
const BoardView = () => {
    return (
        <main className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Settings</h2>
                    <ProfileForm />
                </div>
            </div>
        </main>
    );
};

export default BoardView;
