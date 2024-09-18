import React, { useState } from 'react';

const getGradeFromScore = (score, didNotSit) => {
  if (didNotSit) return 'F'; // Student did not sit for the exam
  
  if (score >= 90) return 'A';
  else if (score >= 85) return 'A-';
  else if (score >= 80) return 'B+';
  else if (score >= 75) return 'B';
  else if (score >= 70) return 'B-';
  else if (score >= 65) return 'C+';
  else if (score >= 60) return 'C';
  else if (score >= 55) return 'D+';
  else if (score >= 50) return 'D';
  else if (score >= 40) return 'E';
  else return 'F'; // For scores below 40
};

const AddGradeForm = () => {
  const [name, setName] = useState('');
  const [score, setScore] = useState('');
  const [grade, setGrade] = useState('');
  const [didNotSit, setDidNotSit] = useState(false);
  const [error, setError] = useState('');

  const handleScoreChange = (e) => {
    const newScore = e.target.value;
    
    if (newScore === '' || (!isNaN(newScore) && newScore >= 0 && newScore <= 100)) {
      setScore(newScore);

      if (newScore === '' || newScore < 0 || newScore > 100) {
        setGrade('');
      } else {
        setGrade(getGradeFromScore(Number(newScore), didNotSit));
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name) {
      setError('Student name is required');
      return;
    }
    if (didNotSit) {
      setGrade('F');
    } else if (score === '') {
      setError('Score is required');
      return;
    } else if (score < 0 || score > 100) {
      setError('Score must be between 0 and 100');
      return;
    }
    setError('');
    
    try {
      // Replace with actual assignment_id and student_id
      const assignment_id = 1; 
      const student_id = 1;
      const date_recorded = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD

      const response = await fetch('http://localhost:5000/submit-grade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assignment_id,
          student_id,
          score: didNotSit ? null : Number(score), // Send null if the student did not sit
          grade,
          date_recorded
        }),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      alert('Grade submitted successfully');
      setName('');
      setScore('');
      setGrade('');
      setDidNotSit(false); // Reset the checkbox
    } catch (error) {
      console.error('Error submitting grade:', error);
      setError('Error submitting grade');
    }
  };

  return (
    <div className="bg-blue-300 p-6 rounded-lg shadow-lg w-full max-w-sm mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add Grade</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Student Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter student's name"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="score" className="block text-gray-700 font-semibold mb-2">Score</label>
          <input
            type="number"
            id="score"
            value={score}
            onChange={handleScoreChange}
            min="0"
            max="100"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter score"
            disabled={didNotSit} // Disable score input if did not sit
          />
        </div>
        <div className="mb-4">
          <label htmlFor="didNotSit" className="flex items-center text-gray-700 font-semibold">
            <input
              type="checkbox"
              id="didNotSit"
              checked={didNotSit}
              onChange={() => setDidNotSit(!didNotSit)}
              className="mr-2"
            />
            Did not sit for the exam
          </label>
        </div>
        <div className="mb-4">
          <label htmlFor="grade" className="block text-gray-700 font-semibold mb-2">Grade</label>
          <input
            type="text"
            id="grade"
            value={grade}
            readOnly
            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            placeholder="Grade will be auto-filled"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddGradeForm;
