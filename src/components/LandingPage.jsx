// src/components/LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-white text-gray-800 flex flex-col">
      <header className="bg-blue-600 text-white p-6 text-center shadow-md">
        <h1 className="text-6xl font-extrabold">School Management System</h1>
        <p className="text-2xl mt-2">Connecting Teachers and Principals</p>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center space-y-8 p-6">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Principal Section */}
          <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105">
            <h2 className="text-3xl font-bold mb-4 text-blue-600">Principal</h2>
            <p className="text-lg mb-6">Manage the school, view reports, and oversee operations.</p>
            <button
              className="bg-blue-700 hover:bg-blue-900 text-white font-semibold py-3 px-6 rounded-lg text-lg"
              onClick={() => navigate('/auth/principal')}
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
              onClick={() => navigate('/auth/teacher')}
            >
              Login as Teacher
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-blue-600 text-white p-4 text-center">
        <p className="text-lg">&copy; 2024 School Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
