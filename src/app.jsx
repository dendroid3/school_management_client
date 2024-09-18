import React, { useState } from 'react';
import StudentList from './StudentList';
import StudentForm from './StudentForm';

const App = () => {
  const [students, setStudents] = useState([]);
  const [studentToEdit, setStudentToEdit] = useState(null);

  const handleAddOrUpdateStudent = (studentData) => {
    if (studentToEdit) {
      // Update existing student
      setStudents(students.map((student) =>
        student.id === studentToEdit.id ? { ...student, ...studentData } : student
      ));
      setStudentToEdit(null); // Reset after editing
    } else {
      // Add new student
      const newStudent = {
        id: Date.now(), // Simple ID generation
        ...studentData,
      };
      setStudents([...students, newStudent]);
    }
  };

  const handleEdit = (student) => {
    setStudentToEdit(student);
  };

  const resetForm = () => {
    setStudentToEdit(null);
  };

  return (
    <div>
      <h1>School Management System</h1>
      <StudentForm 
        studentToEdit={studentToEdit} 
        onSubmit={handleAddOrUpdateStudent} 
        resetForm={resetForm} 
      />
      <StudentList students={students} onEdit={handleEdit} />
    </div>
  );
};

export default App;
