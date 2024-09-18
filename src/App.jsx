import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard'; // Principal's Dashboard
import TeachersDashboard from './components/TeachersDashboard'; // Teacher's Dashboard

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
        
        {/* If you had a student dashboard (currently commented out) */}
        {/* <Route path="/student-dashboard" element={<StudentDashboard />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
