import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
// Import your dashboard components here
import Dashboard from './components/dashboard';
import TeachersDashboard from './components/TeachersDashboard';
// import StudentDashboard from './components/StudentDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* Define other routes here */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/teacher-dashboard" element={<TeachersDashboard />} />
        {/* <Route path="/student-dashboard" element={<StudentDashboard />} /> */}
      </Routes>
      
    </Router>
  );
}

export default App;
