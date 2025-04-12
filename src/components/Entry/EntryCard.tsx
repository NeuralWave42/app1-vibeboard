import React from 'react';

interface EntryCardProps {
  text: string;
  vibe: string;
  author: {
    name: string;
    avatarUrl?: string;
  };
}

const EntryCard: React.FC<EntryCardProps> = ({ text, vibe, author }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <blockquote className="space-y-4">
        <p className="text-gray-700 text-lg">{text}</p>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center ${author.avatarUrl ? 'bg-cover' : ''}`}
                 style={author.avatarUrl ? { backgroundImage: `url(${author.avatarUrl})` } : undefined}>
              {!author.avatarUrl && <span className="text-gray-500 text-sm">{author.name[0]}</span>}
            </div>
            <span className="text-gray-600 font-medium">{author.name}</span>
          </div>
          
          <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
            {vibe}
          </span>
        </div>
      </blockquote>
    </div>
  );
};

export default EntryCard;
