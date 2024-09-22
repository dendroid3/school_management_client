// Auth.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../firebase'; 
import axios from 'axios'
import Cookies from 'js-cookie';

const Auth = ({ userType }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created:', userCredential.user);
      const details_of_user_registered_on_firebase = userCredential.user;

      await updateProfile(details_of_user_registered_on_firebase, { displayName: null });

      Cookies.set('user_id', details_of_user_registered_on_firebase.uid, { expires: 7 });

      const local_user_data = {
        id: details_of_user_registered_on_firebase.uid,
        email: details_of_user_registered_on_firebase.email,
        role: userType === 'principal' ? 2 : 1
      }


      await axios.post('http://localhost:8000/register', local_user_data)

      navigate(userType === 'principal' ? '/dashboard' : '/teacher-dashboard');
    } catch (error) {
      setMessage(error.message);
      console.error("Signup error:", error);
    }
  };

  // Login logic
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);
      navigate(userType === 'principal' ? '/dashboard' : '/teacher-dashboard');
    } catch (error) {
      setMessage(error.message);
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full" onSubmit={isSignup ? handleSignup : handleLogin}>
        <h2 className="text-2xl font-bold text-blue-600 mb-6">
          {isSignup ? 'Sign Up as Principal' : `${userType === 'principal' ? 'Principal' : 'Teacher'} Login`}
        </h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-lg font-semibold mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-lg font-semibold mb-2">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <button type="submit" className="bg-blue-700 text-white w-full py-3 rounded-lg hover:bg-blue-900 transition">
          {isSignup ? 'Sign Up' : 'Login'}
        </button>
        <button
          type="button"
          className="text-blue-600 mt-4 underline float-right"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup ? 'Already have an account? Login' : 'Don\'t have an account? Sign Up'}
        </button>
        {message && <p className="text-red-500 mt-4">{message}</p>}
      </form>
    </div>
  );
};

export default Auth;
