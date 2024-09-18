import React, { useState, useEffect } from 'react';

const StudentForm = ({ studentToEdit, onSubmit, resetForm }) => {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');

  useEffect(() => {
    if (studentToEdit) {
      setName(studentToEdit.name);
      setGrade(studentToEdit.grade);
    } else {
      resetForm();
    }
  }, [studentToEdit, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, grade });
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <select
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        required
      >
        <option value="" disabled>Select Grade</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
      </select>
      <button type="submit">{studentToEdit ? 'Update Student' : 'Add Student'}</button>
    </form>
  );
};

export default StudentForm;
