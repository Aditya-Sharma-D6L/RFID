// src/controllers/studentInfoController.js
// Manages API requests related to student information.

const studentInfoRepository = require("../repositories/studentInfoRepository");
const { successResponse } = require("../utils/responseHelper");

/**
 * Adds new student information.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const addStudentInfo = async (req, res, next) => {
  try {
    const studentInfo = req.body;
    const result = await studentInfoRepository.addStudentInfo(studentInfo);
    successResponse(res, result, "Student information added successfully", 201);
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves student information by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const getStudentInfo = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const result = await studentInfoRepository.getStudentInfoById(studentId);
    if (!result) {
      return res.status(404).json({
        status: "error",
        message: "Student not found",
        metadata: {
          timestamp: new Date().toISOString(),
          path: req.originalUrl,
        },
      });
    }
    successResponse(res, result, "Student information fetched successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addStudentInfo,
  getStudentInfo,
};
