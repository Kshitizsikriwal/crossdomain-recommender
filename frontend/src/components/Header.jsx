import React from 'react';
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const navigate = useNavigate();

  // Retrieve user info from localStorage
  const username = localStorage.getItem('username') || 'Guest';
  const profilePic = localStorage.getItem('profilePic'); // optional
  const defaultPic = `https://api.dicebear.com/7.x/initials/svg?seed=${username}`;

  const handleLogout = () => {
    localStorage.clear();
    navigate('/'); // redirect to home or login page
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md px-16 py-6 flex items-center justify-between">
      {/* Website Logo/Name */}
      <div
        className="text-xl font-bold cursor-pointer "
        onClick={() => navigate('/')}
      >
        🌿 HealthWise
      </div>

      {/* User Info + Logout */}
      <div className="flex items-center space-x-3">
        <img
          src={profilePic || defaultPic}
          alt="profile"
          className="w-11 h-11 rounded-full border-2 border-gray-300"
        />
        <span className="font-medium">{username}</span>
        <button
          onClick={handleLogout}
          className="text-l text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md transition duration-200"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
