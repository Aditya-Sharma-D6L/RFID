// src/routes/attendanceRoutes.js
// Routes for attendance-related API endpoints.

const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");
const cacheMiddleware = require("../middleware/cache");

router.post("/mark-attendance", attendanceController.markAttendance);
router.get("/", cacheMiddleware, attendanceController.getAttendance); // Apply cache middleware to GET requests

module.exports = router;
