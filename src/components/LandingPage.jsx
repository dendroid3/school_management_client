import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [isPrincipalLogin, setIsPrincipalLogin] = useState(false);
  const [isTeacherStudentLogin, setIsTeacherStudentLogin] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handlePrincipalLogin = (e) => {
    e.preventDefault();
    // Logic for principal login (later connect to backend)
    navigate('/dashboard');
  };

  const handleTeacherStudentLogin = (e) => {
    e.preventDefault();
    // Logic for teacher/student login (later connect to backend)
    navigate(isSignup ? '/signup' : '/teacher-dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-white text-gray-800 flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white p-6 text-center shadow-md">
        <h1 className="text-6xl font-extrabold">School Management System</h1>
        <p className="text-2xl mt-2">Connecting Students, Teachers, and Principals</p>
      </header>

      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center space-y-8 p-6">
        {!isPrincipalLogin && !isTeacherStudentLogin && (
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Principal Section */}
            <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105">
              <h2 className="text-3xl font-bold mb-4 text-blue-600">Principal</h2>
              <p className="text-lg mb-6">Manage the school, view reports, and oversee operations.</p>
              <button
                className="bg-blue-700 hover:bg-blue-900 text-white font-semibold py-3 px-6 rounded-lg text-lg"
                onClick={() => setIsPrincipalLogin(true)}
              >
                Login as Principal
              </button>
            </div>

            {/* Teacher Section */}
            <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105">
              <h2 className="text-3xl font-bold mb-4 text-blue-600">Teacher</h2>
              <p className="text-lg mb-6">Manage students, update grades, and track attendance.</p>
              <button
                className="bg-blue-700 hover:bg-blue-900 text-white font-semibold py-3 px-6 rounded-lg text-lg"
                onClick={() => setIsTeacherStudentLogin(true)}
              >
                Login as Teacher
              </button>
            </div>

            {/* Student Section */}
            <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105">
              <h2 className="text-3xl font-bold mb-4 text-blue-600">Student</h2>
              <p className="text-lg mb-6">View your grades, attendance, and get personalized updates.</p>
              <button
                className="bg-blue-700 hover:bg-blue-900 text-white font-semibold py-3 px-6 rounded-lg text-lg"
                onClick={() => setIsTeacherStudentLogin(true)}
              >
                Login as Student
              </button>
            </div>
          </section>
        )}

        {/* Principal Login Form */}
        {isPrincipalLogin && (
          <form className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full" onSubmit={handlePrincipalLogin}>
            <h2 className="text-2xl font-bold text-blue-600 mb-6">Principal Login</h2>
            <div className="mb-4">
              <label htmlFor="principalEmail" className="block text-lg font-semibold mb-2">Email</label>
              <input
                type="email"
                id="principalEmail"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="principalPassword" className="block text-lg font-semibold mb-2">Password</label>
              <input
                type="password"
                id="principalPassword"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <button type="submit" className="bg-blue-700 text-white w-full py-3 rounded-lg hover:bg-blue-900 transition">
              Login
            </button>
            <button
              type="button"
              className="text-blue-600 mt-4 underline"
              onClick={() => setIsPrincipalLogin(false)}
            >
              Go Back
            </button>
          </form>
        )}

        {/* Teacher/Student Sign-In/Sign-Up Form */}
        {isTeacherStudentLogin && (
          <form className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full" onSubmit={handleTeacherStudentLogin}>
            <h2 className="text-2xl font-bold text-blue-600 mb-6">
              {isSignup ? 'Sign Up' : 'Login'} as {isSignup ? 'Teacher/Student' : 'Teacher/Student'}
            </h2>
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg font-semibold mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-lg font-semibold mb-2">Password</label>
              <input
                type="password"
                id="password"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <button type="submit" className="bg-blue-700 text-white w-full py-3 rounded-lg hover:bg-blue-900 transition">
              {isSignup ? 'Sign Up' : 'Login'}
            </button>
            <button
              type="button"
              className="text-blue-600 mt-4 underline"
              onClick={() => setIsTeacherStudentLogin(false)}
            >
              Go Back
            </button>
            <button
              type="button"
              className="text-blue-600 mt-4 underline float-right"
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup ? 'Already have an account? Login' : 'Don\'t have an account? Sign Up'}
            </button>
          </form>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white p-4 text-center">
        <p className="text-lg">&copy; 2024 School Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
