import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockTeachers } from '../mocks/teachers';
import { mockStudents } from '../mocks/students';
import AddGradeForm from './AddGradeForm';
import Attendance from './attendance';

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
    const [teachers, setTeachers] = useState(mockTeachers);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [attendance, setAttendance] = useState([]);
    const [grades, setGrades] = useState([]);
    const [showAddStudentForm, setShowAddStudentForm] = useState(false);
    const [newStudentName, setNewStudentName] = useState('');

    const handleTeacherSelect = (teacher) => {
        setSelectedTeacher(teacher);
        const filteredStudents = mockStudents.filter(student => student.teacherId === teacher.id);
        setStudents(filteredStudents);
        setSelectedStudent(null);
        setAttendance([]);
        setGrades([]);
    };

    const handleStudentSelect = (student) => {
        setSelectedStudent(student);
        setAttendance(mockAttendance);
        setGrades(mockGrades);
    };

    const handleAddStudent = (e) => {
        e.preventDefault();
        if (newStudentName.trim() === '') return; // Ignore empty submissions
        const newStudent = {
            id: students.length + 1,
            name: newStudentName,
            teacherId: selectedTeacher.id,
        };
        setStudents([...students, newStudent]);
        setNewStudentName('');
        setShowAddStudentForm(false);
    };

    const handleRemoveStudent = (studentId) => {
        setStudents(students.filter(student => student.id !== studentId));
    };

    const handleEditGrades = () => {
        navigate('/add-grade');
    };

    const handleEditAttendance = () => {
        navigate('/attendance', { state: { attendanceRecords: attendance } });
    };

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className="flex min-h-screen bg-white">
            <div className="w-1/4 min-h-screen p-4 bg-blue-600 shadow-md rounded-lg text-white">
                <h2 className="text-2xl font-semibold mb-4">Teachers</h2>
                <p className="mb-4">Total Teachers: {teachers.length}</p>
                <ul className="space-y-2">
                    {teachers.map(teacher => {
                        const teacherStudentsCount = mockStudents.filter(student => student.teacherId === teacher.id).length;
                        return (
                            <li
                                key={teacher.id}
                                className={`p-2 cursor-pointer ${selectedTeacher?.id === teacher.id ? 'bg-blue-300' : 'hover:bg-blue-500'} rounded-md`}
                                onClick={() => handleTeacherSelect(teacher)}
                            >
                                {teacher.name} - {teacherStudentsCount} Students
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="w-3/4 p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-blue-700">
                        Teachers' Dashboard
                    </h1>
                    <button
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>

                {selectedTeacher && (
                    <>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Students</h2>
                        <div className="mb-6 p-4 bg-blue-100 shadow-md rounded-lg">
                            <button
                                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                onClick={() => setShowAddStudentForm(!showAddStudentForm)}
                            >
                                {showAddStudentForm ? 'Cancel' : 'Add Student'}
                            </button>
                            {showAddStudentForm && (
                                <form onSubmit={handleAddStudent} className="mb-4">
                                    <input
                                        type="text"
                                        value={newStudentName}
                                        onChange={(e) => setNewStudentName(e.target.value)}
                                        placeholder="Enter student name"
                                        required
                                        className="p-2 border rounded"
                                    />
                                    <button type="submit" className="ml-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                                        Add
                                    </button>
                                </form>
                            )}
                            <ul className="list-disc pl-5 space-y-2">
                                {students.map(student => (
                                    <li
                                        key={student.id}
                                        className="p-2 border rounded-md bg-gray-50 cursor-pointer hover:bg-gray-100"
                                    >
                                        <div className="flex justify-between items-center">
                                            <span onClick={() => handleStudentSelect(student)}>{student.name}</span>
                                            <button
                                                className="text-red-500 hover:text-red-700"
                                                onClick={() => handleRemoveStudent(student.id)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}

                {selectedStudent && (
                    <>
                        <div className="mb-6 p-6 bg-blue-100 shadow-md rounded-lg">
                            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Attendance</h2>
                            <div className="space-y-2">
                                {attendance.map(record => (
                                    <div key={record.id} className="p-2 border rounded-md bg-gray-50">
                                        <div><strong>Date:</strong> {record.date}</div>
                                        <div><strong>Status:</strong> {record.status}</div>
                                    </div>
                                ))}
                            </div>
                            <button
                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                onClick={handleEditAttendance}
                            >
                                Edit Attendance
                            </button>
                        </div>
                        <div className="p-6 bg-blue-100 shadow-md rounded-lg">
                            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Grades</h2>
                            <div className="space-y-2">
                                {grades.map(grade => (
                                    <div key={grade.id} className="p-2 border rounded-md bg-gray-50">
                                        <div><strong>Subject:</strong> {grade.subject}</div>
                                        <div><strong>Grade:</strong> {grade.grade}</div>
                                        <div><strong>Date:</strong> {grade.date}</div>
                                    </div>
                                ))}
                            </div>
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
