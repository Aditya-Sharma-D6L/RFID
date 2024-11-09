// src/repositories/studentInfoRepository.js
// Repository for student_info table interactions.

const pool = require("../config/db.config");

/**
 * Adds a new student information record.
 * @param {Object} studentInfo - The student information details.
 * @returns {Object} - The inserted student information record.
 */
const addStudentInfo = async (studentInfo) => {
  const {
    student_id,
    first_name,
    middle_name,
    last_name,
    dob,
    gender,
    nationality,
  } = studentInfo;
  const query = `
    INSERT INTO student_info (student_id, first_name, middle_name, last_name, dob, gender, nationality)
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
  `;
  const result = await pool.query(query, [
    student_id,
    first_name,
    middle_name,
    last_name,
    dob,
    gender,
    nationality,
  ]);
  return result.rows[0];
};

/**
 * Retrieves a student's info by student ID.
 * @param {number} studentId - The ID of the student.
 * @returns {Object} - The student info record.
 */
const getStudentInfoById = async (studentId) => {
  const query = `SELECT * FROM student_info WHERE student_id = $1`;
  const result = await pool.query(query, [studentId]);
  return result.rows[0];
};

/**
 * Retrieves all RFID details.
 * @returns {Object} - The RFID info record.
 */
const getAllRfid = async (rfid) => {
  const query = `SELECT * FROM student_rfid`;
  const result = await pool.query(query);
  return result;
};

module.exports = {
  addStudentInfo,
  getStudentInfoById,
  getAllRfid,
};
