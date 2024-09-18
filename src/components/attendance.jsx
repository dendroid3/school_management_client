import React, { useState } from "react";

const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [studentName, setStudentName] = useState("");
  const [isPresent, setIsPresent] = useState(true);
  const [error, setError] = useState("");
  const [editingRecord, setEditingRecord] = useState(null);

  const handleAddOrUpdateAttendance = (e) => {
    e.preventDefault();
    if (!studentName) {
      setError("Student name is required");
      return;
    }

    const newRecord = {
      id: editingRecord ? editingRecord.id : attendanceRecords.length + 1,
      name: studentName,
      present: isPresent,
    };

    if (editingRecord) {
      setAttendanceRecords(
        attendanceRecords.map((record) =>
          record.id === editingRecord.id ? newRecord : record
        )
      );
      setEditingRecord(null);
    } else {
      setAttendanceRecords([...attendanceRecords, newRecord]);
    }

    setStudentName("");
    setIsPresent(true);
    setError("");
  };

  const handleDeleteAttendance = (id) => {
    setAttendanceRecords(
      attendanceRecords.filter((record) => record.id !== id)
    );
  };

  const handleEditAttendance = (record) => {
    setEditingRecord(record);
    setStudentName(record.name);
    setIsPresent(record.present);
  };

  // Calculate cumulative attendance for each student
  const cumulativeAttendance = attendanceRecords.reduce((acc, record) => {
    const { name, present } = record;
    if (!acc[name]) {
      acc[name] = { present: 0, absent: 0 };
    }
    if (present) {
      acc[name].present++;
    } else {
      acc[name].absent++;
    }
    return acc;
  }, {});

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Attendance Records</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleAddOrUpdateAttendance} className="mb-6">
        <div className="flex mb-4">
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="border rounded-lg py-2 px-4 flex-grow"
            placeholder="Enter student name"
          />
          <select
            value={isPresent}
            onChange={(e) => setIsPresent(e.target.value === "true")}
            className="border rounded-lg py-2 px-4 ml-2"
          >
            <option value={true}>Present</option>
            <option value={false}>Absent</option>
          </select>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg ml-2"
          >
            {editingRecord ? "Update" : "Add"}
          </button>
        </div>
      </form>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Cumulative Attendance</h3>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Student Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Days Present
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Days Absent
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Object.entries(cumulativeAttendance).map(
            ([name, { present, absent }]) => (
              <tr key={name}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {present}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {absent}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() =>
                      handleEditAttendance({ name, present: present > absent })
                    }
                    className="text-blue-600 hover:text-blue-800 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteAttendance(name)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
