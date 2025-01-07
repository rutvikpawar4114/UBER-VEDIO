/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../Context/Usercontext';

const Userlogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext); // Accessing user context

  const submitHandler = async (e) => {
    e.preventDefault();

    // Validation
    if (!email || !password) {
      setErrorMessage('All fields are required.');
      return;
    }

    const userData = { email, password };

    try {
      // API call to backend login endpoint
      const response = await axios.post('http://localhost:4000/users/login', userData);

      if (response.status === 200) {
        const user = response.data; // Extract user data
        setUser(user); // Update context with logged-in user data
        localStorage.setItem('token', user.token); // Save token for protected routes
        navigate('/home'); // Navigate to Home page
      } else {
        setErrorMessage('Login failed. Please try again.');
      }
    } catch (error) {
      // Handle API errors
      setErrorMessage(
        error.response?.data?.message || 'An error occurred during login.'
      );
      console.error('Login error:', error);
    }

    // Reset form fields
    setEmail('');
    setPassword('');
  };

  return (
    <div className="h-screen p-7 flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-3">What is your email?</h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-lg font-medium mb-3">Enter Password</h3>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            placeholder="password"
          />
          
          {errorMessage && (
            <p className="text-red-600 mb-4 text-sm">{errorMessage}</p>
          )}

          <button className="bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg">
            Login
          </button>
          <p className="text-center">
            New here?{' '}
            <Link to="/signup" className="text-blue-600">
              Create new Account
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link
          to="/captain-login"
          className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default Userlogin;
