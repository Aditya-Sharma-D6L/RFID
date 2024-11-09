// src/services/rfidService.js
// This file contains the logic to handle RFID scans and mark attendance based on RFID tag data.

const studentModel = require("../models/studentModel");
const attendanceModel = require("../models/attendanceModel");

// Handles an RFID scan event by checking the student associated with the RFID
// and marking their attendance
const handleRFIDScan = async (rfid) => {
  // Check if the RFID tag is registered to a student
  const student = await studentModel.getStudentByRFID(rfid);
  if (student) {
    // Mark the student's attendance
    return await attendanceModel.markAttendance(student.id);
  }
  throw new Error("Student not found for this RFID tag"); // Throw error if RFID is unregistered
};

module.exports = {
  handleRFIDScan,
};
