import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Signout = () => {
  const navigate = useNavigate();

  const handleSignout = () => {
    // Clear the token from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userid');
    
    // Redirect to the login page
    navigate('/signin');
  };

  return (
    <button 
      onClick={handleSignout} 
      className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-red-700 transition duration-200"
    >
      Sign Out
    </button>
  );
};


