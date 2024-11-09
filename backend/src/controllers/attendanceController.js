// src/controllers/attendanceController.js
// Manages API requests for attendance-related operations with best-practice metadata and error handling.

const attendanceRepository = require("../repositories/attendanceRepository");
const studentRepository = require("../repositories/studentRepository");
const { successResponse } = require("../utils/responseHelper");

/**
 * Marks attendance based on an RFID scan.
 */
const markAttendance = async (req, res, next) => {
  try {
    const { rfid } = req.body;

    // Check if the RFID belongs to a registered student
    const student = await studentRepository.getStudentByRFID(rfid);
    if (!student) {
      return res.status(404).json({
        status: "error",
        message: "Student not found",
        metadata: {
          timestamp: new Date().toISOString(),
          path: req.originalUrl,
        },
      });
    }

    // Mark attendance for the student
    const attendanceRecord = await attendanceRepository.markAttendance(
      student.id
    );

    // Send success response with attendance data and metadata
    successResponse(
      res,
      attendanceRecord,
      "Attendance marked successfully",
      201
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves attendance records for a specific date with JSON:API-compliant response.
 */
const getAttendance = async (req, res, next) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        jsonapi: { version: "1.0" },
        status: "error",
        message: "Date query parameter is required",
        meta: {
          timestamp: new Date().toISOString(),
          path: req.originalUrl,
        },
      });
    }

    const attendanceRecords = await attendanceRepository.getAttendanceByDate(
      date
    );

    // Example pagination data; replace with actual logic if needed
    const pagination = {
      totalItems: attendanceRecords.length,
      currentPage: 1,
      pageSize: attendanceRecords.length,
      totalPages: 1,
    };

    successResponse(
      res,
      attendanceRecords,
      "Attendance records fetched successfully",
      200,
      pagination
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  markAttendance,
  getAttendance,
};
