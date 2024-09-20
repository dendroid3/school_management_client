import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockTeachers } from '../mocks/teachers';
import { mockStudents } from '../mocks/students';
import StudentForm from './StudentForm'; // Import the StudentForm component
import Attendance from './attendance'; // Import Attendance component
import AddGradeForm from './AddGradeForm'; // Import AddGradeForm component

const mockAttendance = [
    { id: 1, date: '2024-09-01', status: 'Present' },
    { id: 2, date: '2024-09-02', status: 'Absent' },
];

const mockGrades = [
    { id: 1, subject: 'Math', grade: 'A', date: '2024-09-01' },
    { id: 2, subject: 'Science', grade: 'B', date: '2024-09-02' },
];

const TeachersDashboard = () => {
    const navigate = useNavigate();
    const [teachers] = useState(mockTeachers);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [attendance] = useState(mockAttendance);
    const [grades] = useState(mockGrades);
    const [showAddStudentForm, setShowAddStudentForm] = useState(false);

    const handleTeacherSelect = (teacher) => {
        setSelectedTeacher(teacher);
        const filteredStudents = mockStudents.filter(student => student.teacherId === teacher.id);
        setStudents(filteredStudents);
        setSelectedStudent(null);
    };

    const handleStudentSelect = (student) => {
        setSelectedStudent(student);
    };

    const addStudent = (newStudent) => {
        setStudents((prevStudents) => [
            ...prevStudents,
            { ...newStudent, teacherId: selectedTeacher.id },
        ]);
    };

    const removeStudent = (studentId) => {
        setStudents((prevStudents) => prevStudents.filter(student => student.id !== studentId));
        setSelectedStudent(null); // Deselect student if they are removed
    };

    const handleEditAttendance = () => {
        navigate('/attendance', { state: { studentName: selectedStudent?.name, attendanceRecords: attendance } });
    };

    const handleEditGrades = () => {
        navigate('/add-grade', { state: { studentName: selectedStudent?.name } });
    };

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className="relative flex min-h-screen bg-white">
            <div className="w-1/4 min-h-screen p-4 bg-blue-600 shadow-md rounded-lg text-white">
                <h2 className="text-2xl font-semibold mb-4">Teachers</h2>
                <ul className="space-y-2">
                    {teachers.map(teacher => (
                        <li
                            key={teacher.id}
                            className={`p-2 cursor-pointer ${selectedTeacher?.id === teacher.id ? 'bg-blue-300' : 'hover:bg-blue-500'} rounded-md`}
                            onClick={() => handleTeacherSelect(teacher)}
                        >
                            {teacher.name}
                        </li>
                    ))}
                </ul>
                <button
                    className="absolute bottom-4 left-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>

            <div className="w-3/4 p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-blue-700">Teachers' Dashboard</h1>
                </div>

                {selectedTeacher && (
                    <>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Students</h2>
                        <button
                            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            onClick={() => setShowAddStudentForm(!showAddStudentForm)}
                        >
                            {showAddStudentForm ? 'Cancel' : 'Add Student'}
                        </button>
                        {showAddStudentForm && <StudentForm addStudent={addStudent} />}
                        <ul className="list-disc pl-5 space-y-2">
                            {students.map(student => (
                                <li
                                    key={student.id}
                                    className="p-2 border rounded-md bg-gray-50 flex justify-between items-center cursor-pointer hover:bg-gray-100"
                                >
                                    <span onClick={() => handleStudentSelect(student)}>
                                        {student.name}
                                    </span>
                                    <button
                                        className="ml-4 px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                                        onClick={() => removeStudent(student.id)}
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                {selectedStudent && (
                    <>
                        {/* Attendance Section */}
                        <div className="mb-6 p-6 bg-blue-100 shadow-md rounded-lg">
                            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Attendance</h2>
                            {attendance.map(record => (
                                <div key={record.id} className="p-2 border rounded-md bg-gray-50">
                                    <div><strong>Date:</strong> {record.date}</div>
                                    <div><strong>Status:</strong> {record.status}</div>
                                </div>
                            ))}
                            <button
                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                onClick={handleEditAttendance}
                            >
                                Edit Attendance
                            </button>
                        </div>

                        {/* Grades Section */}
                        <div className="p-6 bg-blue-100 shadow-md rounded-lg">
                            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Grades</h2>
                            {grades.map(grade => (
                                <div key={grade.id} className="p-2 border rounded-md bg-gray-50">
                                    <div><strong>Subject:</strong> {grade.subject}</div>
                                    <div><strong>Grade:</strong> {grade.grade}</div>
                                    <div><strong>Date:</strong> {grade.date}</div>
                                </div>
                            ))}
                            <button
                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                onClick={handleEditGrades}
                            >
                                Edit Grades
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default TeachersDashboard;
