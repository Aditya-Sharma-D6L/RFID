// src/repositories/studentContactRepository.js
// Repository for student_contact table interactions.

const pool = require("../config/db.config");

/**
 * Adds a new contact record for a student.
 * @param {Object} contactInfo - The contact details for a student.
 * @returns {Object} - The inserted contact record.
 */
const addStudentContact = async (contactInfo) => {
  const {
    student_id,
    email,
    permanent_address,
    correspondence_address,
    emergency_contact_number,
    alt_emergency_contact_number,
    school_contact_number,
    mode_of_transportation,
    preferred_language,
  } = contactInfo;

  const query = `
    INSERT INTO student_contact (student_id, email, permanent_address, correspondence_address, emergency_contact_number, alt_emergency_contact_number, school_contact_number, mode_of_transportation, preferred_language)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
  `;
  const result = await pool.query(query, [
    student_id,
    email,
    permanent_address,
    correspondence_address,
    emergency_contact_number,
    alt_emergency_contact_number,
    school_contact_number,
    mode_of_transportation,
    preferred_language,
  ]);
  return result.rows[0];
};

module.exports = {
  addStudentContact,
};
