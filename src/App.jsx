import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/dashboard'; // Principal's Dashboard
import TeachersDashboard from './components/TeachersDashboard'; // Teacher's Dashboard
import Attendance from './components/attendance'; // Attendance component
import AddGradeForm from './components/AddGradeForm'; // Add grade form component

// Main application component with routing for different pages.
function App() {
  return (
    <Router>
      <Routes>
        {/* Default landing page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Principal dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Teacher dashboard */}
        <Route path="/teacher-dashboard" element={<TeachersDashboard />} />

        {/* Attendance page */}
        <Route path="/attendance" element={<Attendance />} />
        
        {/* Add grade form page */}
        <Route path="/add-grade" element={<AddGradeForm />} />
      </Routes>
    </Router>
  );
}

export default App;
