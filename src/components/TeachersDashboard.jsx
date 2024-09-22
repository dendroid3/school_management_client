import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { useNavigate } from 'react-router-dom';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase'; 

function TeachersDashboard() {
    const navigate = useNavigate();
    const [showAddStudentForm, setShowAddStudentForm] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [myStudents, setMyStudents] = useState([])
    const [newStudentFirstName, setNewStudentFirstName] = useState('');
    const [newStudentSurname, setNewStudentSurname] = useState('');
    const [newStudentRegistrationNumber, setNewStudentRegistrationNumber] = useState('');
    const [newStudentLevel, setNewStudentLevel] = useState('');
    const [user, setUser] = useState('');
    const popoverRef = useRef(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setUser(user);
          } else {
            setUser('Guest');
          }
        });
        return () => unsubscribe();
    })

    useEffect(() => {
        const fetchMyStudents = async () => {
            try {
                const user_id = Cookies.get('user_id');
                const url = `https://school-management-api-jn73.onrender.com/students/${user_id}/get`;
                
                const students = await axios.get(url);
                setMyStudents(students.data);  // Make sure you use students.data
                console.log(students.data);
            } catch (error) {
                console.error("Failed to fetch students", error);
            }
        };

        // Call the function directly without returning it
        fetchMyStudents();
    }, [])

    const handleLogout = () => {
        navigate('/')
    }

    const fetchMyStudents = async () => {
        try {
            const user_id = Cookies.get('user_id');
            const url = `https://school-management-api-jn73.onrender.com/students/${user_id}/get`;
            
            const students = await axios.get(url);
            setMyStudents(students.data);  // Make sure you use students.data
            console.log(students.data);
        } catch (error) {
            console.error("Failed to fetch students", error);
        }
    };

    const handleAddStudentClick = () => {
        setShowAddStudentForm(true);
    };

    const handleStudentClick = (student) => {
        setSelectedStudent(student);
        setTimeout(() => {
            handleNavigateToViewStudent()
        }, 100);
    };

    const handleNewStudentFirstNameChange = (e) => {
        setNewStudentFirstName(e.target.value);
    };

    const handleNewStudentSurnameChange = (e) => {
        setNewStudentSurname(e.target.value);
    };

    const handleNewStudentRegistrationNumberChange = (e) => {
        setNewStudentRegistrationNumber(e.target.value);
    };

    const handleNewStudentLevelChange = (e) => {
        setNewStudentLevel(e.target.value);
    };

    const handleAddStudentSubmit = async (e) => {
        e.preventDefault();
        try {
            const user_id = Cookies.get('user_id');
            const url = `https://school-management-api-jn73.onrender.com/student/add/${user_id}/${newStudentRegistrationNumber}/${newStudentFirstName}/${newStudentSurname}/${newStudentLevel}`

            const response = await axios.get(url)
            alert(response.data)
            setNewStudentFirstName(null)
            setNewStudentSurname(null)
            setNewStudentLevel(null)
            setNewStudentRegistrationNumber(null)
            setShowAddStudentForm(false)
            fetchMyStudents();
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteStudent = async (student) => {
        try {
            const confirmation = confirm(`You are about to delete ${student.first_name} ${student.surname}, registration number ${student.registration_number}.\nProceed?`)
            if(!confirmation){
                return
            }

            const url = `https://school-management-api-jn73.onrender.com/student/delete/${student.id}`
            console.log(url)
            const response = await axios.delete(url)
            alert(response.data)
            fetchMyStudents();
        } catch (error) {
            console.log(error)
        }
    }

    const handleNavigateToViewStudent = (student_id) => {
        navigate(`/student/${student_id}`); // Navigate to the dynamic student route
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
        <header className="bg-blue-800 text-white p-4 text-center shadow-md flex justify-between items-center">
            <h1 className="text-4xl font-bold">School Management Dashboard</h1>
            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"  onClick={handleLogout} >
            Logout
            </button>
        </header>
        <main className="flex-grow p-6">
            <div className="container mx-auto">
            <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
                <h2 className="text-2xl font-semibold mb-4">Class Overview</h2>
                <div className="grid grid-cols-1">
                    <div className="bg-green-100 p-6 rounded-lg shadow">
                        <h3 className="text-xl font-semibold text-green-700 mb-2">Total Students</h3>
                        <p className="text-2xl font-bold text-green-900">{myStudents[0] ? myStudents.length : 0}</p>
                    </div>
                {/* <div className="bg-blue-100 p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold text-blue-700 mb-2">Students Present Today</h3>
                    <p className="text-2xl font-bold text-blue-900">{"teachers.length"}</p>
                </div> */}
                </div>
            </section>

            <section className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 p-8 md:p-12 rounded-lg shadow-lg relative overflow-hidden">
                <h2 className="text-3xl font-bold text-gray-800 z-10 mb-6">Students</h2>
                <button onClick={handleAddStudentClick} className="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 mb-6">
                    Add New Student
                </button>
                {myStudents.length === 0 ? (
                    <p className="text-gray-800 text-lg relative z-10">No teachers available.</p>
                ) : (
                    <ul className="space-y-4 relative z-10">
                        {myStudents.map(student => (
                        <li key={student.id} className="bg-white p-6 rounded-lg shadow-lg relative flex justify-between items-center">
                            <div className="text-xl font-semibold text-gray-900">{`${student.registration_number}: ${student.first_name} ${student.surname}`}</div>
                            <div className="flex space-x-4">
                            <button className="px-4 py-2 bg-blue-700 text-white text-sm font-semibold rounded-lg hover:bg-blue-800 transition-colors duration-200" onClick={() => handleNavigateToViewStudent(student.id)}>
                                View Student
                            </button>
                            <button className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200" onClick={() => handleDeleteStudent(student)}>
                                Delete
                            </button>
                            </div>
                        </li>
                        ))} 
                    </ul>
                )}
            </section>

            {showAddStudentForm && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
                <div className="bg-white p-8 rounded-lg shadow-lg w-4/5 md:w-3/5 relative">
                    <button className="absolute top-2 right-2 text-gray-500 text-2xl" onClick={() => setShowAddStudentForm(false)}>&times;</button>
                    <h2 className="text-2xl font-semibold mb-6">Add New Student</h2>
                    <form  onSubmit={handleAddStudentSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="teacherName">First Name</label>
                            <input type="text" id="teacherName" className="border rounded-lg py-2 px-4 w-full" required value={newStudentFirstName} onChange={handleNewStudentFirstNameChange}  />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="teacherName">Surname</label>
                            <input type="text" id="teacherName" className="border rounded-lg py-2 px-4 w-full" required value={newStudentSurname} onChange={handleNewStudentSurnameChange}/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="teacherName">Registration Number</label>
                            <input type="text" id="teacherName" className="border rounded-lg py-2 px-4 w-full" required value={newStudentRegistrationNumber} onChange={handleNewStudentRegistrationNumberChange}/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="teacherName">Level</label>
                            <input type="text" id="teacherName" className="border rounded-lg py-2 px-4 w-full" required value={newStudentLevel} onChange={handleNewStudentLevelChange} />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                                Add Student
                            </button>
                            <button type="button" className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200" onClick={() => setShowAddStudentForm(false)}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
                </div>
            )}

            {selectedStudent !== null && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
                <div ref={popoverRef} className="bg-white p-8 rounded-lg shadow-lg w-9/10 relative">
                    <button className="absolute top-2 right-2 text-gray-500 text-2xl">&times;</button>
                    <h2 className="text-2xl font-semibold mb-6">Student name</h2>
                    <h3 className="text-xl font-semibold mb-1">overview</h3>
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mean Grade</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance Today</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {/* {filteredStudents.map(student => ( */}
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{"student.name"}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{"student.grade"}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{"student.attendance"}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{"student.gradeDate"}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{"student.attendanceDate"}</td>
                            </tr>
                            {/* ))} */}
                        </tbody>
                    </table>
                    <h3 className="text-xl font-semibold mb-1">grades</h3>
                    <div className="h-[5vh]">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">mark</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">grade</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {/* {filteredStudents.map(student => ( */}
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{"student.name"}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{"student.subject"}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{"student.grade"}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{"student.attendance"}</td>
                                </tr>
                                {/* ))} */}
                            </tbody>
                        </table>
                    </div>
                    <div className="pt-1 justify-center flex z-[999]">
                        <button className="px-4 py-2 mx-4 bg-blue-700 text-white text-sm font-semibold rounded-lg hover:bg-blue-800 transition-colors duration-200" onClick={handleNavigateToViewUStudent}>
                            View Student
                        </button>
                    </div>

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

export default TeachersDashboard;
