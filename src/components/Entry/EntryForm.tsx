import React, { useState } from 'react';

const VIBE_OPTIONS = [
  'Excited',
  'Grateful',
  'Focused',
  'Calm',
  'Other'
];

interface EntryFormProps {
  onSubmit: (entry: { text: string; vibe: string }) => void;
}

const EntryForm: React.FC<EntryFormProps> = ({ onSubmit }) => {
  const [text, setText] = useState('');
  const [vibe, setVibe] = useState('Excited');
  const [customVibe, setCustomVibe] = useState('');
  const [isCustomVibe, setIsCustomVibe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    onSubmit({
      text,
      vibe: isCustomVibe ? customVibe : vibe
    });

    // Reset form
    setText('');
    if (isCustomVibe) {
      setCustomVibe('');
    }
  };

  const handleVibeChange = (value: string) => {
    if (value === 'Other') {
      setIsCustomVibe(true);
      setVibe(value);
    } else {
      setIsCustomVibe(false);
      setVibe(value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="entry-text" className="block text-sm font-medium text-gray-700 mb-1">
          What's on your mind?
        </label>
        <textarea
          id="entry-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          rows={3}
          required
        />
      </div>

      <div className="flex gap-4 items-start">
        <div className="flex-1">
          <label htmlFor="vibe-select" className="block text-sm font-medium text-gray-700 mb-1">
            Current Vibe
          </label>
          {isCustomVibe ? (
            <input
              type="text"
              value={customVibe}
              onChange={(e) => setCustomVibe(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe your vibe"
              required
            />
          ) : (
            <select
              id="vibe-select"
              value={vibe}
              onChange={(e) => handleVibeChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              {VIBE_OPTIONS.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          )}
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          disabled={!text.trim() || (isCustomVibe && !customVibe.trim())}
        >
          Share
        </button>
      </div>
    </form>
  );
};

export default EntryForm;
