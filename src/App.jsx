import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TeachersDashboard from './components/TeachersDashboard';
import Attendance from './components/attendance';
import AddGradeForm from './components/AddGradeForm';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/teachers-dashboard" element={<TeachersDashboard />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/add-grade" element={<AddGradeForm />} />
      </Routes>
    </Router>
  );
}

export default App;
