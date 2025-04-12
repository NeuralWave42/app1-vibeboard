import React from "react";

/**
 * Main board view component that displays the collaborative workspace
 */
const BoardView = () => {
  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <section className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Board</h1>
          </div>
          <div>
            <p className="text-gray-600">
              Your collaborative board workspace
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BoardView;
