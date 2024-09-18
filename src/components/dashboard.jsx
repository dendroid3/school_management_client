import { useState, useEffect, useRef } from 'react';

// Mock Data for demonstration
const mockTeachers = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
];

const mockStudents = [
  { id: 1, name: 'Alice', grade: 'A', attendance: '95%', subject: 'Math', teacherId: 1, gradeDate: '2024-09-15', attendanceDate: '2024-09-17' },
  { id: 2, name: 'Bob', grade: 'B', attendance: '88%', subject: 'Math', teacherId: 1, gradeDate: '2024-09-10', attendanceDate: '2024-09-17' },
  { id: 3, name: 'Charlie', grade: 'A+', attendance: '100%', subject: 'English', teacherId: 2, gradeDate: '2024-09-12', attendanceDate: '2024-09-16' },
  { id: 4, name: 'David', grade: 'B+', attendance: '90%', subject: 'English', teacherId: 2, gradeDate: '2024-09-13', attendanceDate: '2024-09-16' },
];

function Dashboard() {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [newTeacherName, setNewTeacherName] = useState('');
  const [showAddTeacherForm, setShowAddTeacherForm] = useState(false);
  const [editingTeacherId, setEditingTeacherId] = useState(null);
  const popoverRef = useRef(null);

  useEffect(() => {
    // Simulate fetching data with a delay
    const fetchData = async () => {
      setTeachers([]); // Clear teachers data initially
      setStudents([]); // Clear students data initially

      // Simulate delay and then update data
      setTimeout(() => {
        setTeachers(mockTeachers);
        setStudents(mockStudents);
      }, 3000); // Simulated fetch delay
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setSelectedTeacher(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleTeacherClick = (teacherId) => {
    setSelectedTeacher(teacherId);
  };

  const handleAddTeacherClick = () => {
    console.log('Add New Teacher button clicked');
    setShowAddTeacherForm(true);
  };

  const handleNewTeacherChange = (e) => {
    setNewTeacherName(e.target.value);
  };

  const handleAddTeacherSubmit = (e) => {
    e.preventDefault();
    if (newTeacherName.trim() === '') return;

    const newTeacher = {
      id: teachers.length + 1, // Simple ID generation for demo
      name: newTeacherName
    };

    setTeachers([...teachers, newTeacher]);
    setNewTeacherName('');
    setShowAddTeacherForm(false);
  };

  const handleDeleteTeacher = (teacherId) => {
    setTeachers(teachers.filter(t => t.id !== teacherId));
    if (selectedTeacher === teacherId) {
      setSelectedTeacher(null);
    }
  };

  const handleClosePopover = () => {
    setSelectedTeacher(null);
  };

  const handleLogout = () => {
    // Logic for logging out, e.g., clearing authentication tokens, redirecting to login page, etc.
    alert('Logging out...');
    // For example:
    // window.location.href = '/login';
  };

  const filteredStudents = students.filter(student => student.teacherId === selectedTeacher);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <header className="bg-blue-800 text-white p-4 text-center shadow-md flex justify-between items-center">
        <h1 className="text-4xl font-bold">School Management Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Logout
        </button>
      </header>
      <main className="flex-grow p-6">
        <div className="container mx-auto">
          {/* Summary Section */}
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

          {/* Centered Teachers Section */}
          <section className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 p-8 md:p-12 rounded-lg shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gray-200 opacity-30"></div>
            <h2 className="relative text-3xl font-bold text-gray-800 z-10 mb-6">Teachers</h2>
            <button
              onClick={handleAddTeacherClick}
              className="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 mb-6"
            >
              Add New Teacher
            </button>
            {teachers.length === 0 ? (
              <p className="text-gray-800 text-lg relative z-10">Teacher data will be available after merging on GitHub.</p>
            ) : (
              <ul className="space-y-4 relative z-10">
                {teachers.map(teacher => (
                  <li
                    key={teacher.id}
                    className="bg-white p-6 rounded-lg shadow-lg relative flex justify-between items-center"
                  >
                    <div className="text-xl font-semibold text-gray-900">{teacher.name}</div>
                    <div className="flex space-x-4">
                      <button
                        className="px-4 py-2 bg-blue-700 text-white text-sm font-semibold rounded-lg hover:bg-blue-800 transition-colors duration-200"
                        onClick={() => handleTeacherClick(teacher.id)}
                      >
                        View Students
                      </button>
                      <button
                        className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200"
                        onClick={() => handleDeleteTeacher(teacher.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Add New Teacher Form */}
          {showAddTeacherForm && (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
              <div className="bg-white p-8 rounded-lg shadow-lg w-4/5 md:w-3/5 relative">
                <button
                  className="absolute top-2 right-2 text-gray-500 text-2xl"
                  onClick={() => setShowAddTeacherForm(false)}
                >
                  &times;
                </button>
                <h2 className="text-2xl font-semibold mb-6">Add New Teacher</h2>
                <form onSubmit={handleAddTeacherSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="teacherName">
                      Teacher Name
                    </label>
                    <input
                      type="text"
                      id="teacherName"
                      value={newTeacherName}
                      onChange={handleNewTeacherChange}
                      className="border rounded-lg py-2 px-4 w-full"
                      required
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      type="submit"
                      className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                      Add Teacher
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddTeacherForm(false)}
                      className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Students Popover */}
          {selectedTeacher !== null && (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
              <div
                ref={popoverRef}
                className="bg-white p-8 rounded-lg shadow-lg w-4/5 md:w-3/5 relative"
              >
                <button
                  className="absolute top-2 right-2 text-gray-500 text-2xl"
                  onClick={handleClosePopover}
                >
                  &times;
                </button>
                <h2 className="text-2xl font-semibold mb-6">
                  Students under {teachers.find(t => t.id === selectedTeacher)?.name}
                </h2>
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
