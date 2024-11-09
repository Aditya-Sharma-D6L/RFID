// src/repositories/studentRepository.js
const pool = require("../config/db.config");

/**
 * Adds a new student to the student_info table.
 */
const createStudentInfo = async (studentInfo) => {
  const query = `
    INSERT INTO student_info (first_name, middle_name, last_name, dob, gender, nationality)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
  const values = [
    studentInfo.first_name,
    studentInfo.middle_name,
    studentInfo.last_name,
    studentInfo.dob,
    studentInfo.gender,
    studentInfo.nationality,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

/**
 * Updates the student_id in the student_info table to match its info_id.
 */
const updateStudentInfoId = async (infoId) => {
  const query = `UPDATE student_info SET student_id = $1 WHERE info_id = $1`;
  await pool.query(query, [infoId]);
};

/**
 * Retrieves a student's information by info_id.
 */
const getStudentInfoById = async (infoId) => {
  const query = `SELECT * FROM student_info WHERE info_id = $1`;
  const result = await pool.query(query, [infoId]);
  return result.rows[0];
};

/**
 * Creates a new student RFID record in the student_rfid table.
 */
const createStudentRFID = async (studentId, name, rfid) => {
  const query = `INSERT INTO student_rfid (id, name, rfid) VALUES ($1, $2, $3) RETURNING *`;
  const result = await pool.query(query, [studentId, name, rfid]);
  return result.rows[0];
};

/**
 * Retrieves all RFID records from student_rfid table.
 */
const getAllRfid = async () => {
  const query = `SELECT id, name, rfid FROM student_rfid`;
  const result = await pool.query(query);
  return result;
};

module.exports = {
  createStudentInfo,
  updateStudentInfoId,
  getStudentInfoById, // Add this function to retrieve updated info
  createStudentRFID,
  getAllRfid,
};
