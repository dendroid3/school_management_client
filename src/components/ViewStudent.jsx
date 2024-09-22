// StudentForm.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'

const ViewStudent = () => {
    const { student_id } = useParams();
    const [ fetchedStudent, setFetchedStudent] = useState()

    
    useEffect(() => {
        const fetchStudent = async () => {
            const url = `http://localhost:8000/student/get_one/${student_id}`
            console.log(url)
            const response = await axios.get(url)
            setFetchedStudent(response.data)
            console.log(response.data)
        }
        fetchStudent();
    }, []);

    const handleAddGrade = async () => {
        try {
            const subject = prompt("Enter Subject")
            const mark = prompt("Enter Mark")

            const url = `http://localhost:8000/student/add_grade/${student_id}/${subject}/${mark}`
            console.log(url)
            const response = await axios.get(url)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    const calculateMeanGrade = (grades) => {
        let total_marks = 0

        grades.forEach(grade => {
            total_marks += grade.mark
        });

        let mean_mark = total_marks / grades.length

        if(mean_mark < 40){
            return `${mean_mark.toFixed(1)} (F)`
        }
        if(mean_mark < 50 && mean_mark >= 40){
            return `${mean_mark.toFixed(1)} (D)`
        }
        if(mean_mark < 60 && mean_mark >= 50){
            return `${mean_mark.toFixed(1)} (C)`
        }
        if(mean_mark < 70 && mean_mark >= 60){
            return `${mean_mark.toFixed(1)} (B)`
        }
        if(mean_mark >= 70){
            return `${mean_mark.toFixed(1)} (A)`
        }
        
    }

    const handleMarkPresent = async () => {
        try {
            const url = `http://localhost:8000/student/${student_id}/mark_present`
            const response = await axios.get(url)
            alert(response.data)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    
    <div className="bg-gray-50 min-h-screen flex flex-col">
        <header className="bg-blue-800 text-white p-4 text-center shadow-md flex justify-between items-center">
            <h1 className="text-4xl font-bold">School Management Dashboard</h1>
            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
            Logout
            </button>
        </header>
        {fetchedStudent ? (
            <div className="bg-white p-8 rounded-lg  w-8/10 relative">
                <button className="absolute top-2 right-2 text-gray-500 text-2xl">&times;</button>
                <h2 className="text-2xl font-semibold mb-6">{`${fetchedStudent.first_name} ${fetchedStudent.surname}`}</h2>
                <h3 className="text-xl font-semibold mb-1">overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-100 p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold text-green-700 mb-2">Mean Grade</h3>
                    <p className="text-2xl font-bold text-green-900">{calculateMeanGrade(fetchedStudent.grades)}</p>
                </div>
                <div className="bg-blue-100 p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold text-blue-700 mb-2">Total Attendances</h3>
                    <p className="text-2xl font-bold text-blue-900">{fetchedStudent.attandance.length}</p>
                </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-1">grades</h3>
                <div>
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
                            {fetchedStudent.grades.map(grade => (
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{grade.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{grade.subject}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{grade.mark}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{grade.grade}</td>
                            </tr>
                            ))} 
                        </tbody>
                    </table>
                </div>
                <div className="pt-1 justify-center flex z-[999]">
                    <button className="px-4 py-2 mx-4 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200" onClick={handleAddGrade}>
                        Add Grade
                    </button>
                     
                    <button className="px-4 py-2 mx-4 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200" onClick={handleMarkPresent}>
                        Mark Present
                    </button>
                </div>

            </div>
        ) : (
            <p>Loading...</p>
        )}
    </div>
  );
};

export default ViewStudent;
