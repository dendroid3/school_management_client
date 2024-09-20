import React, { useState } from 'react';
import StudentForm from './StudentForm';

// Main component for student management, containing the student form.
const StudentApp = () => {
  const [students, setStudents] = useState([]);

  const addStudent = (newStudent) => {
    setStudents([...students, newStudent]);
  };

  return (
    <div>
      <h1>Student Management</h1>
      <StudentForm addStudent={addStudent} />
    </div>
  );
};

export default StudentApp;
