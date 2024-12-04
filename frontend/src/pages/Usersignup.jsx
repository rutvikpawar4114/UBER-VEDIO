/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Usersignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ firstName , setFirstName] = useState('');
  const [ lastName , setLastName] = useState('');
  const [ userData , setUserData] = useState({});

  const submitHandler = (e) => { 
    e.preventDefault(); // this function is used for to not reload the page 

    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setUserData({
      fullName:{
      firstName:firstName,
      lastName:lastName,},
      
      email:email,
      password:password

    })

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


          <h3 className="text-lg font-medium mb-4">What is your name</h3>
          <div className='flex gap-3 mb-6'>
          <input
            required
            value={firstName}
            onChange={(e) => 
              setFirstName(e.target.value)}
            className="bg-[#eeeeee] w-1/2  rounded px-4 py-2 border  text-lg placeholder:text-base"
            type="name"
            placeholder="first name"
          />
          <input 
          required
          value={lastName}
          onChange={(e) =>
             setLastName(e.target.value)}
          className="bg-[#eeeeee]  w-1/2  rounded px-4 py-2 border text-lg placeholder:text-base"
          type="text"
          placeholder='Last name' />
          </div>

          <h3 className="text-lg font-medium mb-4">What is your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-lg font-medium mb-4">Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            type="password"
            placeholder="password"
          />
          <button className="bg-[#111] text-white font-semibold mb-5 rounded px-4 py-2 w-full text-base placeholder:text-sm">
            Login
          </button>
          <p className="text-center">
           Already have Account?{' '}
            <Link to="/login" className="text-blue-600">
              Login here
            </Link>
          </p>
        </form>
      </div>
      <div>
        <p className='text-[10px] leading-tight'>
          By proceeding, you consent to get calls, WhatsApp or sms measseges,including by automated means,from Uber and its affiliated, including by automated means, from Uber and its affiliates to the number provided.
        </p>
      </div>
    </div>
  );
};

export default Usersignup;