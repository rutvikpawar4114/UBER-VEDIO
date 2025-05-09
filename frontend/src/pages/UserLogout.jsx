// eslint-disable-next-line no-unused-vars
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const UserLogout = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
      Logout
    </button>
  );
};

export default UserLogout;
