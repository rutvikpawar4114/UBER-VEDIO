/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Captainsignup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [userData, setUserData] = useState({});

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const submitHandler = (e) => {
    e.preventDefault(); // Prevents page reload

    setUserData({
      fullName: {
        firstName: formData.firstName,
        lastName: formData.lastName,
      },
      email: formData.email,
      password: formData.password,
    });

    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });
  };

  return (
    <div className="h-screen p-7 flex flex-col justify-between">
      {/* Logo */}
      <div>
      <Link to="/Captain-login">
          <img
            className="w-20 mb-5"
            src="https://www.svgrepo.com/show/505031/uber-driver.svg"
            alt="Uber Logo"
          />
        </Link>

        {/* Signup Form */}
        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-4">What's our Captain's name?</h3>
          <div className="flex gap-3 mb-6">
            {/* First Name */}
            <input
              required
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="First Name"
            />

            {/* Last Name */}
            <input
              required
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="Last Name"
            />
          </div>

          <h3 className="text-lg font-medium mb-4">What's our Captain's email?</h3>
          <input
            required
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-lg font-medium mb-4">Enter Password</h3>
          <input
            required
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            type="password"
            placeholder="Create Password"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-black text-white font-semibold mb-5 rounded px-4 py-2 w-full text-base"
          >
            Sign Up
          </button>

          {/* Login Link */}
          <p className="text-center">
            Already have an account?{' '}
            <Link to="/Captain-login" className="text-blue-600">
              Login here
            </Link>
          </p>
        </form>
      </div>

      {/* Footer Section */}
      <div>
        <p className="text-[10px] leading-tight text-center">
          This site is protected by reCAPTCHA and the{' '}
          <span className="underline">Google Privacy Policy</span> <br />
          and <span className="underline">Terms of Service</span> apply.
        </p>
      </div>
    </div>
  );
};

export default Captainsignup;
