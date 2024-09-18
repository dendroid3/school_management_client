import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
// Import your dashboard components here
// import PrincipalDashboard from './components/PrincipalDashboard';
// import TeacherDashboard from './components/TeacherDashboard';
// import StudentDashboard from './components/StudentDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* Define other routes here */}
        {/* <Route path="/principal-dashboard" element={<PrincipalDashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} /> */}
      </Routes>
      
    </Router>
  );
}

export default App;
