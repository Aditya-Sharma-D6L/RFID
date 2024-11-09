// src/repositories/studentParentDetailsRepository.js
// Repository for student_parent_details table interactions.

const pool = require("../config/db.config");

/**
 * Adds a new parent/guardian record for a student.
 * @param {Object} parentDetails - The parent or guardian details.
 * @returns {Object} - The inserted parent/guardian record.
 */
const addParentDetails = async (parentDetails) => {
  const {
    student_id,
    father_name,
    mother_name,
    father_occupation,
    mother_occupation,
    guardian_contact_number,
    guardian_occupation,
    relation_with_guardian,
    parent_contact_number,
    alt_parent_contact_number,
    parent_email,
    relation_with_parent,
    parent_address,
  } = parentDetails;

  const query = `
    INSERT INTO student_parent_details (student_id, father_name, mother_name, father_occupation, mother_occupation, guardian_contact_number, guardian_occupation, relation_with_guardian, parent_contact_number, alt_parent_contact_number, parent_email, relation_with_parent, parent_address)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *
  `;
  const result = await pool.query(query, [
    student_id,
    father_name,
    mother_name,
    father_occupation,
    mother_occupation,
    guardian_contact_number,
    guardian_occupation,
    relation_with_guardian,
    parent_contact_number,
    alt_parent_contact_number,
    parent_email,
    relation_with_parent,
    parent_address,
  ]);
  return result.rows[0];
};

module.exports = {
  addParentDetails,
};
