import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = ({ userType }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [principalExists, setPrincipalExists] = useState(false);

  useEffect(() => {
    const checkPrincipalExists = async () => {
      const response = await fetch("http://127.0.0.1:8000/users/");
      if (response.ok) {
        const data = await response.json();
        setPrincipalExists(data.some(user => user.user_type === 'principal'));
      }
    };
    checkPrincipalExists();
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (userType === 'principal' && principalExists) {
      setMessage('A principal already exists. Please log in.');
      return;
    }

    const response = await fetch("http://127.0.0.1:8000/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        user_type: userType,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      if (userType === 'principal') {
        setPrincipalExists(true);
      }
      alert(data.message);
      navigate(userType === 'principal' ? '/dashboard' : '/teacher-dashboard');
    } else {
      setMessage(data.detail);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:8000/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username,
        password,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.access_token); // Store the JWT token
      navigate(userType === 'principal' ? '/dashboard' : '/teacher-dashboard');
    } else {
      setMessage(data.detail);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full" onSubmit={isSignup ? handleSignup : handleLogin}>
        <h2 className="text-2xl font-bold text-blue-600 mb-6">{isSignup ? 'Sign Up as Principal' : `${userType === 'principal' ? 'Principal' : 'Teacher'} Login`}</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-lg font-semibold mb-2">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
