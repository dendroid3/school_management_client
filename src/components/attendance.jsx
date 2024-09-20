import React, { useState, useEffect, useCallback } from "react";

// Sample student data - replace this with your student fetching logic
const students = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Alice Johnson" },
];

const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [attendanceDate, setAttendanceDate] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [markType, setMarkType] = useState("present");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState({});
  const currentYear = new Date().getFullYear();

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const showErrorMessage = (message) => {
    setError(message);
    setTimeout(() => setError(""), 3000);
  };

  const isValidAttendanceDate = (attendanceDate) => {
    if (!attendanceDate) {
      return "Attendance date is required.";
    }
    const selectedYear = new Date(attendanceDate).getFullYear();
    if (selectedYear !== currentYear) {
      return "Attendance date must be in the current year.";
    }
    return null; // No errors
  };

  const handleMarkAttendance = async (e) => {
    e.preventDefault();

    const errorMessage = isValidAttendanceDate(attendanceDate);
    if (errorMessage) {
      showErrorMessage(errorMessage);
      return;
    }

    const student = students.find((s) => s.id === parseInt(selectedStudentId));

    if (!student) {
      showErrorMessage("Please select a valid student.");
      return;
    }

    const isAlreadyMarked =
      markType === "present"
        ? attendanceRecords.some(
            (record) =>
              record.id === student.id &&
              record.present.includes(attendanceDate)
          )
        : attendanceRecords.some(
            (record) =>
              record.id === student.id && record.absent.includes(attendanceDate)
          );

    if (isAlreadyMarked) {
      showErrorMessage(
        `Attendance for ${markType} on ${attendanceDate} is already marked.`
      );
      return;
    }

    const newRecord = {
      id: student.id,
      studentName: student.name,
      present: markType === "present" ? [attendanceDate] : [],
      absent: markType === "absent" ? [attendanceDate] : [],
    };

    setAttendanceRecords((prevRecords) => {
      const existingRecord = prevRecords.find(
        (record) => record.id === student.id
      );
      const updatedRecords = existingRecord
        ? prevRecords.map((record) =>
            record.id === student.id
              ? {
                  ...record,
                  present:
                    markType === "present"
                      ? [...record.present, attendanceDate]
                      : record.present,
                  absent:
                    markType === "absent"
                      ? [...record.absent, attendanceDate]
                      : record.absent,
                }
              : record
          )
        : [...prevRecords, newRecord];

      localStorage.setItem("attendanceRecords", JSON.stringify(updatedRecords));
      return updatedRecords;
    });

    showSuccessMessage("Attendance marked successfully!");

    const payload = {
      student_id: student.id,
      attendance_date: attendanceDate,
      status: markType,
    };

    try {
      const response = await fetch("http://localhost:8000/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to mark attendance");
      }
      showSuccessMessage(data.message);
    } catch (error) {
      showErrorMessage(error.message || "Failed to mark attendance");
    }

    setAttendanceDate("");
    setSelectedStudentId("");
    setMarkType("present");
  };

  const handleDeleteAttendance = useCallback((id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      setAttendanceRecords((prevRecords) => {
        const updatedRecords = prevRecords.filter((record) => record.id !== id);
        localStorage.setItem(
          "attendanceRecords",
          JSON.stringify(updatedRecords)
        );
        return updatedRecords;
      });
      showSuccessMessage("Attendance record deleted successfully!");
    }
  }, []);

  const handleDropdownToggle = (id) => {
    setDropdownOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleRemoveAttendance = (id, type, date) => {
    setAttendanceRecords((prevRecords) => {
      const updatedRecords = prevRecords.map((record) => {
        if (record.id === id) {
          if (type === "present") {
            return {
              ...record,
              present: record.present.filter((d) => d !== date),
            };
          } else if (type === "absent") {
            return {
              ...record,
              absent: record.absent.filter((d) => d !== date),
            };
          }
        }
        return record;
      });
      localStorage.setItem("attendanceRecords", JSON.stringify(updatedRecords));
      return updatedRecords;
    });
    showSuccessMessage(`Date ${date} removed from ${type}`);
  };

  useEffect(() => {
    const savedRecords = localStorage.getItem("attendanceRecords");
    if (savedRecords) {
      setAttendanceRecords(JSON.parse(savedRecords));
    }
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Attendance Records</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {successMessage && (
        <p className="text-green-500 mb-4">{successMessage}</p>
      )}

      <form
        onSubmit={handleMarkAttendance}
        className="mb-6 flex flex-col md:flex-row"
      >
        <div className="flex-grow mb-4 md:mb-0 md:mr-2">
          <label htmlFor="studentSelect" className="sr-only">
            Select Student
          </label>
          <select
            id="studentSelect"
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
            className="border rounded-lg py-2 px-4 w-full"
            aria-label="Select Student"
          >
            <option value="">Select a student</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-grow mb-4 md:mb-0 md:mr-2">
          <input
            type="date"
            value={attendanceDate}
            onChange={(e) => setAttendanceDate(e.target.value)}
            className="border rounded-lg py-2 px-4 w-full"
            aria-label="Attendance Date"
          />
        </div>
        <div className="relative mb-4 md:mb-0 md:mr-2">
          <select
            value={markType}
            onChange={(e) => setMarkType(e.target.value)}
            className="border rounded-lg py-2 px-4 w-full"
            aria-label="Mark Attendance"
          >
            <option value="present">Mark Present</option>
            <option value="absent">Mark Absent</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Mark
        </button>
      </form>

      <h3 className="text-lg font-semibold mb-4">Cumulative Attendance</h3>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Student
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Days Present
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Days Absent
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {attendanceRecords.map((record) => (
            <tr key={record.id}>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                {record.studentName}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="relative">
                  <button
                    onClick={() => handleDropdownToggle(record.id)}
                    className="text-blue-600 hover:text-blue-800 mr-4"
                  >
                    {record.present.length} Dates
                  </button>
                  {dropdownOpen[record.id] && (
                    <div className="absolute right-0 bg-white shadow-lg rounded-lg mt-1 z-10">
                      {record.present.map((date, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 text-sm text-gray-700"
                        >
                          {date}
                          <button
                            onClick={() =>
                              handleRemoveAttendance(record.id, "present", date)
                            }
                            className="text-red-600 hover:text-red-800 ml-2"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="relative">
                  <button
                    onClick={() => handleDropdownToggle(`absent-${record.id}`)}
                    className="text-red-600 hover:text-red-800 mr-4"
                  >
                    {record.absent.length} Dates
                  </button>
                  {dropdownOpen[`absent-${record.id}`] && (
                    <div className="absolute right-0 bg-white shadow-lg rounded-lg mt-1 z-10">
                      {record.absent.map((date, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 text-sm text-gray-700"
                        >
                          {date}
                          <button
                            onClick={() =>
                              handleRemoveAttendance(record.id, "absent", date)
                            }
                            className="text-red-600 hover:text-red-800 ml-2"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                <button
                  onClick={() => handleDeleteAttendance(record.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
