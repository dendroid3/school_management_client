import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/dashboard';
import TeachersDashboard from './components/TeachersDashboard';
import AddGradeForm from './components/AddGradeForm'; // Import AddGradeForm component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/teacher-dashboard" element={<TeachersDashboard />} />
        <Route path="/add-grade" element={<AddGradeForm />} /> {/* Add route for AddGradeForm */}
      </Routes>
    </Router>
  );
}

export default App;
