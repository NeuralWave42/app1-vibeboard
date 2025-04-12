import React from 'react';

interface ProfileDisplayProps {
  name: string;
  bio: string;
}

const ProfileDisplay: React.FC<ProfileDisplayProps> = ({ name, bio }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Profile</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Name</h3>
          <p className="mt-1 text-base text-gray-900">{name}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Bio</h3>
          <p className="mt-1 text-base text-gray-900 whitespace-pre-wrap">{bio}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileDisplay;
