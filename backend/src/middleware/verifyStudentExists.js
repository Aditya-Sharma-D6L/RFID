// src/middleware/verifyStudentExists.js
const pool = require("../config/db.config");

/**
 * Middleware to check if a student exists in the student_info table.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const verifyStudentExists = async (req, res, next) => {
  try {
    const { id } = req.body; // Assuming `id` is provided in the request body

    // Query to check if the student exists in student_info
    const query = `SELECT * FROM student_info WHERE student_id = $1`;
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      // If no record found, return a 404 error
      return res.status(404).json({
        status: "error",
        message: "Student not found in student_info table",
        metadata: {
          timestamp: new Date().toISOString(),
          path: req.originalUrl,
        },
      });
    }

    // If student exists, proceed to the next middleware/controller
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = verifyStudentExists;
