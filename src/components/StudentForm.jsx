// StudentForm.js
import React, { useState } from 'react';

const StudentForm = ({ addStudent }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === '') return; // Ignore empty submissions
    addStudent({ id: Date.now(), name }); // Use a unique ID for the new student
    setName(''); // Reset the input field
  };

  return (
    <div className="p-6 bg-blue-100 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Add New Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Student
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
