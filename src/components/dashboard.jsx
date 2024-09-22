import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'; 

function Dashboard() {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [newTeacherEmail, setNewTeacherEmail] = useState('');
  const [newTeacherPassword, setNewTeacherPassword] = useState('');
  const [showAddTeacherForm, setShowAddTeacherForm] = useState(false);
  const [teachersStudents, setSelectedTeacherStudents] = useState(false);
  const [loading, setLoading] = useState(true);
  const popoverRef = useRef(null);
  const navigate = useNavigate();
  
  // Function to fetch data from the API
  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://school-management-api-jn73.onrender.com/teachers/get_all')

      setTeachers(response.data);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleLogout = () => {
    navigate('/')
  }

  const handleTeacherClick = async (teacher_id) => {
    setSelectedTeacherStudents(null)
    setSelectedTeacher(teacher_id);

    const url = `https://school-management-api-jn73.onrender.com/teacher/get_students/${teacher_id}`
    const response = await axios.get(url)
    console.log(response.data)
    setSelectedTeacherStudents(response.data)

    console.log(url)
  };

  const calculateMeanGrade = (grades) => {
    let total_marks = 0
    grades.forEach(grade => {
      total_marks += grade.mark
    });

    const mean_mark = total_marks / grades.length

    if(mean_mark < 40){
      return `${mean_mark} (F)`
    } else if(mean_mark > 40 && mean_mark <= 50){
      return `${mean_mark} (D)`
    } else if(mean_mark > 50 && mean_mark <= 60){
      return `${mean_mark} (C)`
    } else if(mean_mark > 60 && mean_mark <= 60){
      return `${mean_mark} (B)`
    } else {
      return `${mean_mark} (A)`
    }
     
  }

  const handleAddTeacherClick = () => {
    setShowAddTeacherForm(true);
  };

  const handleNewTeacherEmailChange = (e) => {
    setNewTeacherEmail(e.target.value);
  };

  const handleNewTeacherPasswordChange = (e) => {
    setNewTeacherPassword(e.target.value);
  };

  const handleAddTeacherSubmit = async (e) => {
    e.preventDefault();
    if (newTeacherEmail.trim() === '') return;

    const userCredential = await createUserWithEmailAndPassword(auth, newTeacherEmail, newTeacherPassword);

    try {
      const new_teacher_credential = {
        id: userCredential.user.uid,
        email: newTeacherEmail,
        password: newTeacherPassword,
        role: 1
      }

      await axios.post('https://school-management-api-jn73.onrender.com/register', new_teacher_credential)
   
      alert("You have successfully added a new teacher!")
      fetchTeachers();

    } catch (error) {
      console.error('Error adding teacher:', error);
    }

    setNewTeacherEmail('');
    setShowAddTeacherForm(false);
  };

  const handleDeleteTeacher = async (teacher) => {
    try {
      console.log(teacher)
      const response = await axios.delete(`https://school-management-api-jn73.onrender.com/teachers/delete/${teacher.id}`);
      setTeachers((prevTeachers) => prevTeachers.filter(t => t.id !== teacher.id));
      if (selectedTeacher === teacher.id) {
        setSelectedTeacher(null);
      }

      fetchTeachers()

      alert(response.data)
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
        <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200" onClick={handleLogout}>
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
                    <div className="text-xl font-semibold text-gray-900">{teacher.email}</div>
                    <div className="flex space-x-4">
                      <button className="px-4 py-2 bg-blue-700 text-white text-sm font-semibold rounded-lg hover:bg-blue-800 transition-colors duration-200" onClick={() => handleTeacherClick(teacher.id)}>
                        View Students
                      </button>
                      <button className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200" onClick={() => handleDeleteTeacher(teacher)}>
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
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="teacherName">Teacher Email</label>
                    <input type="text" id="teacherName" value={newTeacherEmail} onChange={handleNewTeacherEmailChange} className="border rounded-lg py-2 px-4 w-full" required />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="teacherName">Password</label>
                    <input type="text" id="teacherName" value={newTeacherPassword} onChange={handleNewTeacherPasswordChange} className="border rounded-lg py-2 px-4 w-full" required />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                      Add Teacher
                    </button>
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
                <h2 className="text-2xl font-semibold mb-6">Students under selected teacher</h2>
                { (teachersStudents) ? (
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration Number</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mean Grade</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {teachersStudents.map(student => (
                        <tr key={student.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{`${student.first_name} ${student.surname}`}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.registration_number}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.level}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{calculateMeanGrade(student.grades)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>Loading</p>
                )}
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
