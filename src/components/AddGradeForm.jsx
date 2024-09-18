import React, { useState } from 'react';

const getGrade = (score) => {
  if (score >= 90) return 'A';
  if (score >= 85) return 'A-';
  if (score >= 80) return 'B+';
  if (score >= 75) return 'B';
  if (score >= 70) return 'B-';
  if (score >= 65) return 'C+';
  if (score >= 60) return 'C';
  if (score >= 55) return 'D+';
  if (score >= 50) return 'D';
  return 'F';
};

const AddGradeForm = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [score, setScore] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const numericScore = parseInt(score, 10);
    
    if (name && numericScore >= 0 && numericScore <= 100) {
      const grade = getGrade(numericScore);
      setStudents([...students, { name, grade, score: numericScore }]);
      setName('');
      setScore('');
    } else {
      alert('Score must be between 0 and 100.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <form onSubmit={handleSubmit} className="bg-blue-50 shadow-md rounded px-8 py-6 mb-4">
        <h2 className="text-lg font-bold mb-4 text-blue-800">Add Student Grade</h2>
        
        <div className="mb-4">
          <label className="block text-blue-700 text-sm font-bold mb-2">Student's Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-blue-700 text-sm font-bold mb-2">Score (0-100)</label>
          <input
            type="number"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
            required
            min="0"
            max="100"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300"
        >
          Submit
        </button>
      </form>

      <div className="bg-blue-100 p-4 rounded">
        <h3 className="text-lg font-bold mb-2 text-blue-800">Student Grades</h3>
        <ul>
          {students.map((student, index) => (
            <li key={index} className="border-b py-2 text-blue-700">
              <strong>{student.name}</strong> - Grade: {student.grade}, Score: {student.score}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddGradeForm;
