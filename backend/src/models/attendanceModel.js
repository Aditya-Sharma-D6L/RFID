// src/models/attendanceModel.js
// Defines the structure of the Attendance entity for reference.

module.exports = {
  id: "INTEGER PRIMARY KEY", // Unique identifier for each attendance record
  student_id: "INTEGER REFERENCES students(id) ON DELETE CASCADE", // Foreign key referencing the Student entity
  timestamp: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", // Timestamp for when attendance was recorded
};
