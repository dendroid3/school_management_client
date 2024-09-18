import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [isPrincipalLogin, setIsPrincipalLogin] = useState(false);
  const [isTeacherLogin, setIsTeacherLogin] = useState(false);
  const navigate = useNavigate();

  // Mock login for Principal
  const handlePrincipalLogin = (e) => {
    e.preventDefault();
    // Logic for principal login (connect to backend later)
    navigate('/dashboard'); // Redirect to principal dashboard
  };

  // Mock login for Teacher
  const handleTeacherLogin = (e) => {
    e.preventDefault();
    // Logic for teacher login (connect to backend later)
    navigate('/teacher-dashboard'); // Redirect to teacher dashboard
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-white text-gray-800 flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white p-6 text-center shadow-md">
        <h1 className="text-6xl font-extrabold">School Management System</h1>
        <p className="text-2xl mt-2">Connecting Teachers and Principals</p>
      </header>

      {/* Main content */}
      <main className="flex-grow flex items-center justify-center">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 max-w-6xl mx-auto">
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
              onClick={() => setIsTeacherLogin(true)}
            >
              Login as Teacher
            </button>
          </div>
        </section>

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

        {/* Teacher Login Form */}
        {isTeacherLogin && (
          <form className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full" onSubmit={handleTeacherLogin}>
            <h2 className="text-2xl font-bold text-blue-600 mb-6">Teacher Login</h2>
            <div className="mb-4">
              <label htmlFor="teacherEmail" className="block text-lg font-semibold mb-2">Email</label>
              <input
                type="email"
                id="teacherEmail"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="teacherPassword" className="block text-lg font-semibold mb-2">Password</label>
              <input
                type="password"
                id="teacherPassword"
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
              onClick={() => setIsTeacherLogin(false)}
            >
              Go Back
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
