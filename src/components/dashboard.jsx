import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function Dashboard() {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [newTeacherName, setNewTeacherName] = useState('');
  const [showAddTeacherForm, setShowAddTeacherForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const popoverRef = useRef(null);

  // Function to fetch data from the API
  const fetchData = async () => {
    setLoading(true);
    try {
      const [teachersResponse] = await Promise.all([
        axios.get('http://127.0.0.1:8000/teachers'),
        
      ]);
      setTeachers(teachersResponse.data);
      //setStudents(studentsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTeacherClick = (teacherId) => {
    setSelectedTeacher(teacherId);
  };

  const handleAddTeacherClick = () => {
    setShowAddTeacherForm(true);
  };

  const handleNewTeacherChange = (e) => {
    setNewTeacherName(e.target.value);
  };

  const handleAddTeacherSubmit = async (e) => {
    e.preventDefault();
    if (newTeacherName.trim() === '') return;

    try {
      const response = await axios.post('http://127.0.0.1:8000/teachers', { name: newTeacherName });
      const newTeacher = response.data;
      setTeachers((prevTeachers) => [...prevTeachers, newTeacher]);
    } catch (error) {
      console.error('Error adding teacher:', error);
    }

    setNewTeacherName('');
    setShowAddTeacherForm(false);
  };

  const handleDeleteTeacher = async (teacherId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/teachers/${teacherId}`);
      setTeachers((prevTeachers) => prevTeachers.filter(t => t.id !== teacherId));
      if (selectedTeacher === teacherId) {
        setSelectedTeacher(null);
      }
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  };

  const filteredStudents = students.filter(student => student.teacherId === selectedTeacher);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <header className="bg-blue-800 text-white p-4 text-center shadow-md flex justify-between items-center">
        <h1 className="text-4xl font-bold">School Management Dashboard</h1>
        <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
          Logout
        </button>
      </header>
      <main className="flex-grow p-6">
        <div className="container mx-auto">
          <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-semibold mb-4">School Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-100 p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold text-green-700 mb-2">Total Students</h3>
                <p className="text-2xl font-bold text-green-900">{students.length}</p>
              </div>
              <div className="bg-blue-100 p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold text-blue-700 mb-2">Total Teachers</h3>
                <p className="text-2xl font-bold text-blue-900">{teachers.length}</p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 p-8 md:p-12 rounded-lg shadow-lg relative overflow-hidden">
            <h2 className="text-3xl font-bold text-gray-800 z-10 mb-6">Teachers</h2>
            <button onClick={handleAddTeacherClick} className="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 mb-6">
              Add New Teacher
            </button>
            {teachers.length === 0 ? (
              <p className="text-gray-800 text-lg relative z-10">No teachers available.</p>
            ) : (
              <ul className="space-y-4 relative z-10">
                {teachers.map(teacher => (
                  <li key={teacher.id} className="bg-white p-6 rounded-lg shadow-lg relative flex justify-between items-center">
                    <div className="text-xl font-semibold text-gray-900">{teacher.name}</div>
                    <div className="flex space-x-4">
                      <button className="px-4 py-2 bg-blue-700 text-white text-sm font-semibold rounded-lg hover:bg-blue-800 transition-colors duration-200" onClick={() => handleTeacherClick(teacher.id)}>
                        View Students
                      </button>
                      <button className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200" onClick={() => handleDeleteTeacher(teacher.id)}>
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {showAddTeacherForm && (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
              <div className="bg-white p-8 rounded-lg shadow-lg w-4/5 md:w-3/5 relative">
                <button className="absolute top-2 right-2 text-gray-500 text-2xl" onClick={() => setShowAddTeacherForm(false)}>&times;</button>
                <h2 className="text-2xl font-semibold mb-6">Add New Teacher</h2>
                <form onSubmit={handleAddTeacherSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="teacherName">Teacher Name</label>
                    <input type="text" id="teacherName" value={newTeacherName} onChange={handleNewTeacherChange} className="border rounded-lg py-2 px-4 w-full" required />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">Add Teacher</button>
                    <button type="button" onClick={() => setShowAddTeacherForm(false)} className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {selectedTeacher !== null && (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
              <div ref={popoverRef} className="bg-white p-8 rounded-lg shadow-lg w-4/5 md:w-3/5 relative">
                <button className="absolute top-2 right-2 text-gray-500 text-2xl" onClick={() => setSelectedTeacher(null)}>&times;</button>
                <h2 className="text-2xl font-semibold mb-6">Students under {teachers.find(t => t.id === selectedTeacher)?.name}</h2>
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredStudents.map(student => (
                      <tr key={student.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.subject}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.grade}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.attendance}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.gradeDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.attendanceDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2024 School Management System</p>
      </footer>
    </div>
  );
}

export default Dashboard;
