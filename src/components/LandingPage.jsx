import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-white text-gray-800 flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white p-6 text-center shadow-md">
        <h1 className="text-6xl font-extrabold">School Management System</h1>
        <p className="text-2xl mt-2">Connecting Students, Teachers, and Principals</p>
      </header>

      {/* Main content */}
      <main className="flex-grow flex items-center justify-center">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 max-w-6xl mx-auto">
          {/* Principal Section */}
          <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105">
            <h2 className="text-3xl font-bold mb-4 text-blue-600">Principal</h2>
            <p className="text-lg mb-6">Manage the school, view reports, and oversee operations.</p>
            <button 
              className="bg-blue-700 hover:bg-blue-900 text-white font-semibold py-3 px-6 rounded-lg text-lg"
              onClick={() => navigate('/principal-dashboard')}
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
              onClick={() => navigate('/teacher-dashboard')}
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
              onClick={() => navigate('/student-dashboard')}
            >
              Login as Student
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white p-4 text-center">
        <p className="text-lg">&copy; 2024 School Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
