import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

// Grade calculation logic
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
  const location = useLocation();
  const studentName = location.state?.studentName || ''; // Getting student name from state

  const [students, setStudents] = useState([]); // Store fetched student grades
  const [score, setScore] = useState(''); // Form score value
  const [selectedStudent, setSelectedStudent] = useState(null); // Track selected student for editing
  const [error, setError] = useState(''); // Error handling state

  // Fetch all grades from backend on component mount
  useEffect(() => {
    fetchGrades();
  }, []);

  // Function to fetch all grades
  const fetchGrades = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/grades/');
      setStudents(response.data); // Update the state with fetched grades
    } catch (error) {
      console.error('Error fetching grades:', error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const numericScore = parseInt(score, 10);

    // Ensure valid score and student name
    if (studentName && numericScore >= 0 && numericScore <= 100) {
      const grade = getGrade(numericScore);

      // Check for duplicate grade submission
      const existingStudent = students.find((student) => student.name === studentName);

      try {
        if (selectedStudent) {
          // Update existing grade if editing
          await axios.put(`http://127.0.0.1:8000/grades/${selectedStudent.id}`, {
            name: studentName,
            score: numericScore,
            grade,
          });
        } else if (!existingStudent) {
          // Create new grade if not editing and no existing grade
          await axios.post('http://127.0.0.1:8000/grades/', {
            name: studentName,
            score: numericScore,
            grade,
          });
        } else {
          // Show error if grade already exists for the student
          setError('This student already has a submitted grade.');
          return;
        }

        // After successful submission, fetch updated grades
        fetchGrades();

        // Reset the form fields
        setScore('');
        setSelectedStudent(null);
        setError('');
      } catch (error) {
        console.error('Error submitting grade:', error);
        setError('Failed to submit grade.');
      }
    } else {
      setError('Score must be between 0 and 100.');
    }
  };

  // Handle selecting a student for editing
  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setScore(student.score);
  };

  // Handle deleting a student grade
  const handleDeleteGrade = async (studentId) => {
    const confirmation = window.confirm('Are you sure you want to delete this grade?');
    if (!confirmation) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/grades/${studentId}`);
      setStudents(students.filter((student) => student.id !== studentId)); // Remove deleted student from UI
    } catch (error) {
      console.error('Error deleting grade:', error);
      setError('Failed to delete grade.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      {/* Grade Submission Form */}
      <form onSubmit={handleSubmit} className="bg-blue-50 shadow-md rounded px-8 py-6 mb-4">
        <h2 className="text-lg font-bold mb-4 text-blue-800">
          {selectedStudent ? 'Edit Student Grade' : 'Add Student Grade'}
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-blue-700 text-sm font-bold mb-2">Student's Name</label>
          <input
            type="text"
            value={studentName} // Keep the student name constant
            readOnly
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
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
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300 transition duration-300 ease-in-out"
        >
          {selectedStudent ? 'Update Grade' : 'Submit Grade'}
        </button>
      </form>

      {/* Submitted Grades Table */}
      <div className="bg-blue-100 p-4 rounded mt-4">
        <h3 className="text-lg font-bold mb-2 text-blue-800">Submitted Grades</h3>

        <table className="min-w-full table-auto bg-white shadow-md rounded">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Score</th>
              <th className="px-4 py-2">Grade</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-t">
                <td className="px-4 py-2">{student.name}</td>
                <td className="px-4 py-2">{student.score}</td>
                <td className="px-4 py-2">{student.grade}</td>
                <td className="px-4 py-2">
                  <button
                    className="text-sm text-blue-600 underline hover:text-blue-800 hover:bg-blue-100 transition duration-300 ease-in-out rounded px-2 py-1 mr-2"
                    onClick={() => handleEditStudent(student)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-sm text-red-600 underline hover:text-red-800 hover:bg-red-100 transition duration-300 ease-in-out rounded px-2 py-1"
                    onClick={() => handleDeleteGrade(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddGradeForm;
