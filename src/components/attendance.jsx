import React, { useState } from "react";

const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [attendanceDate, setAttendanceDate] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [actionDate, setActionDate] = useState("");

  const currentYear = new Date().getFullYear();

  const generateId = () => Date.now();

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const showErrorMessage = (message) => {
    setError(message);
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  const validateName = (name) => /^[A-Za-z]+$/.test(name);

  const handleAddOrUpdateAttendance = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!firstName || !lastName || !attendanceDate) {
      showErrorMessage("First name, last name, and date are required");
      return;
    }

    const studentName = `${firstName} ${lastName}`;

    // Validate name length and characters
    if (studentName.length > 20) {
      showErrorMessage("Name must not exceed 20 characters");
      return;
    }
    if (!validateName(firstName) || !validateName(lastName)) {
      showErrorMessage("Names must contain only alphabetic characters");
      return;
    }

    const selectedYear = new Date(attendanceDate).getFullYear();
    if (selectedYear !== currentYear) {
      showErrorMessage("Attendance date must be in the current year");
      return;
    }

    const existingRecordIndex = attendanceRecords.findIndex(
      (record) => record.name === studentName
    );

    if (existingRecordIndex > -1) {
      const existingRecord = attendanceRecords[existingRecordIndex];
      // Check for duplicate date in present or absent days
      if (
        existingRecord.present.includes(attendanceDate) ||
        existingRecord.absent.includes(attendanceDate)
      ) {
        showErrorMessage(
          "Attendance record for this student on this date already exists"
        );
        return;
      }

      // Add date to present days
      existingRecord.present.push(attendanceDate);
      setAttendanceRecords([
        ...attendanceRecords.slice(0, existingRecordIndex),
        existingRecord,
        ...attendanceRecords.slice(existingRecordIndex + 1),
      ]);
      showSuccessMessage("Attendance updated successfully!");
    } else {
      const newRecord = {
        id: generateId(),
        name: studentName,
        present: [attendanceDate],
        absent: [],
      };
      setAttendanceRecords([...attendanceRecords, newRecord]);
      showSuccessMessage("Attendance added successfully!");
    }

    // Reset input fields
    setFirstName("");
    setLastName("");
    setAttendanceDate("");
  };

  const handleDeleteAttendance = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      setAttendanceRecords(
        attendanceRecords.filter((record) => record.id !== id)
      );
      showSuccessMessage("Attendance record deleted successfully!");
    }
  };

  const handleDropdownToggle = (id) => {
    setDropdownOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleChangeAttendance = (id, type) => {
    if (!actionDate) {
      showErrorMessage(`Please select a date to mark as ${type}.`);
      return;
    }

    const selectedYear = new Date(actionDate).getFullYear();
    if (selectedYear !== currentYear) {
      showErrorMessage("Attendance date must be in the current year");
      return;
    }

    setAttendanceRecords((prevRecords) =>
      prevRecords.map((record) => {
        if (record.id === id) {
          if (type === "present") {
            return { ...record, present: [...record.present, actionDate] };
          } else if (type === "absent") {
            return { ...record, absent: [...record.absent, actionDate] };
          }
        }
        return record;
      })
    );
    showSuccessMessage("Attendance updated successfully!");
    setActionDate("");
    setDropdownOpen({});
    setTimeout(() => setDropdownOpen({}), 3000); // Close dropdown after 3 seconds
  };

  const handleRemoveAttendance = (id, type, date) => {
    setAttendanceRecords((prevRecords) =>
      prevRecords.map((record) => {
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
      })
    );
    showSuccessMessage(`Date ${date} removed from ${type}`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Attendance Records</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {successMessage && (
        <p className="text-green-500 mb-4">{successMessage}</p>
      )}

      <form
        onSubmit={handleAddOrUpdateAttendance}
        className="mb-6 flex flex-col md:flex-row"
      >
        <div className="flex-grow mb-4 md:mb-0 md:mr-2">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border rounded-lg py-2 px-4 w-full"
            placeholder="Enter first name"
            aria-label="First Name"
          />
        </div>
        <div className="flex-grow mb-4 md:mb-0 md:mr-2">
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border rounded-lg py-2 px-4 w-full"
            placeholder="Enter last name"
            aria-label="Last Name"
          />
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
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Add
        </button>
      </form>

      <h3 className="text-lg font-semibold mb-4">Cumulative Attendance</h3>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Student Name
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
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {record.name}
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
                <div className="relative">
                  <button
                    onClick={() => handleDropdownToggle(`actions-${record.id}`)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Actions
                  </button>
                  {dropdownOpen[`actions-${record.id}`] && (
                    <div className="absolute right-0 bg-white shadow-lg rounded-lg mt-1 z-10">
                      <div className="px-4 py-2">
                        <input
                          type="date"
                          value={actionDate}
                          onChange={(e) => setActionDate(e.target.value)}
                          className="border rounded-lg py-1 px-2 w-full mb-2"
                          aria-label="Action Date"
                        />
                        <div className="flex justify-between">
                          <button
                            onClick={() =>
                              handleChangeAttendance(record.id, "present")
                            }
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Mark Present
                          </button>
                          <button
                            onClick={() =>
                              handleChangeAttendance(record.id, "absent")
                            }
                            className="text-red-600 hover:text-red-800"
                          >
                            Mark Absent
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleDeleteAttendance(record.id)}
                  className="text-red-600 hover:text-red-800 ml-2"
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
