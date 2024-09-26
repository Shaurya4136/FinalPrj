// src/components/ClubNavbar.js
import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ClubNavbar = () => {
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const toggleProfileOptions = () => {
    setShowProfileOptions(!showProfileOptions);
  };

  // Function to handle navigation
  const handleNavigation = (path) => {
    navigate(path); // Navigate to the selected path
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 shadow-lg">
      <h1 className="text-2xl font-bold">Club Community</h1>
      <div className="relative">
        <FaUserCircle
          className="text-4xl cursor-pointer"
          onClick={toggleProfileOptions}
        />
        {showProfileOptions && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-700 shadow-md rounded-lg">
            <ul className="py-2">
              <li
                className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                onClick={() => handleNavigation('/club-community')} // Navigate to Club Community
              >
                Club Community
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                onClick={() => handleNavigation('/club-profile')} // Navigate to Profile
              >
                Profile
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                onClick={() => handleNavigation('/club-post')} // Navigate to Logout (Login/Register Page)
              >
                Post
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                onClick={() => handleNavigation('/club-logout')} // Navigate to Logout (Login/Register Page)
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClubNavbar;
