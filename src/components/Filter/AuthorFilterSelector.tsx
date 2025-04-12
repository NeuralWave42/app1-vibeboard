import React from 'react';
import { CheckCircle } from 'lucide-react';

interface AuthorFilterSelectorProps {
  selectedAuthors: string[];
  onAuthorToggle: (author: string) => void;
  className?: string;
}

const MOCK_AUTHORS = [
  { name: 'Sarah Chen', avatarUrl: 'https://i.pravatar.cc/150?u=sarah' },
  { name: 'Alex Thompson', avatarUrl: null },
  { name: 'Maria Garcia', avatarUrl: 'https://i.pravatar.cc/150?u=maria' },
  { name: 'John Smith', avatarUrl: null },
  { name: 'Emma Wilson', avatarUrl: 'https://i.pravatar.cc/150?u=emma' }
];

export const AuthorFilterSelector: React.FC<AuthorFilterSelectorProps> = ({
  selectedAuthors,
  onAuthorToggle,
  className = ''
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {MOCK_AUTHORS.map(({ name, avatarUrl }) => (
        <button
          key={name}
          onClick={() => onAuthorToggle(name)}
          className={`flex items-center w-full p-2 rounded-lg transition-colors
            ${selectedAuthors.includes(name)
              ? 'bg-blue-50 text-blue-700'
              : 'hover:bg-gray-50'
            }`}
        >
          <div className="flex items-center flex-1">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={name}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">
                  {name.charAt(0)}
                </span>
              </div>
            )}
            <span className="ml-3 text-sm font-medium">{name}</span>
          </div>
          <CheckCircle 
            size={18}
            className={`transition-opacity ${
              selectedAuthors.includes(name)
                ? 'opacity-100'
                : 'opacity-0'
            }`}
          />
        </button>
      ))}
    </div>
  );
};
