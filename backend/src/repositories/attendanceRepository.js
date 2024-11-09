// src/repositories/attendanceRepository.js
// Handles database operations for the Attendance entity, including counting records by date.

const pool = require("../config/db.config");

// Marks attendance by adding a new record with the student's ID and timestamp
const markAttendance = async (studentId) => {
  const query = `INSERT INTO attendance (student_id, timestamp) VALUES ($1, NOW()) RETURNING *`;
  const result = await pool.query(query, [studentId]);
  return result.rows[0];
};

// Counts total attendance records for a specific date
const countAttendanceByDate = async (date) => {
  const query = `SELECT COUNT(*) FROM attendance WHERE timestamp::date = $1`;
  const result = await pool.query(query, [date]);
  return parseInt(result.rows[0].count, 10); // Convert count to an integer
};

// Retrieves all attendance records for a specific date
const getAttendanceByDate = async (date) => {
  const query = `SELECT * FROM attendance WHERE timestamp::date = $1`;
  const result = await pool.query(query, [date]);
  return result.rows;
};

// Export the functions for use in the controller
module.exports = {
  markAttendance,
  countAttendanceByDate,
  getAttendanceByDate,
};
