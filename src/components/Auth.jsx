import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = ({ userType }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // Placeholder for signup logic
    alert('Signup logic goes here.');
    navigate(userType === 'principal' ? '/dashboard' : '/teacher-dashboard');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Placeholder for login logic
    alert('Login logic goes here.');
    navigate(userType === 'principal' ? '/dashboard' : '/teacher-dashboard');
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
