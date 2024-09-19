// StudentForm.js
import React, { useState } from 'react';

const StudentForm = ({ addStudent }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === '') return; // Ignore empty submissions
    addStudent({ id: Date.now(), name }); // Use a unique ID for the new student
    setName('');
  };

  return (
    <div>
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default StudentForm;
