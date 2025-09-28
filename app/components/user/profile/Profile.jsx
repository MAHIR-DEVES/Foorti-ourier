'use client';
import { CgProfile } from 'react-icons/cg';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/app/api/UserProvider/UserProvider';
import EditProfileModal from '../../Modal/EditProfileModal';

const Profile = () => {
  const { user } = useContext(UserContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // modal state

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  return (
    <div className="p-8 mb-6 flex items-center flex-col gap-6 justify-center border-b border-gray-200 bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-sm">
      <div className="text-center relative">
        {/* Profile image container */}
        <div className="w-32 h-32 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 p-1 shadow-md">
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
            <CgProfile className="text-7xl text-gray-300" />
          </div>
        </div>

        {/* Camera Icon */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-full">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Profile Info */}
      <div className="text-center mt-4">
        <h2 className="text-2xl font-bold text-gray-800">Name: {name}</h2>
        <p className="text-gray-600 mt-2">Email: {email}</p>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)} // modal open
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-medium transition-colors duration-300 shadow-sm"
          >
            Edit Profile
          </button>
          <button className="px-5 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-full text-sm font-medium transition-colors duration-300">
            Share Profile
          </button>
        </div>
      </div>

      {/* Modal */}
      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentName={name}
        currentEmail={email}
        setName={setName}
        setEmail={setEmail}
      />
    </div>
  );
};

export default Profile;
