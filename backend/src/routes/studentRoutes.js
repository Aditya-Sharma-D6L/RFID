// src/routes/studentRoutes.js
// Routes for student-related API endpoints.

const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

// Route to add a student
router.post("/create-student", studentController.addStudent);

module.exports = router;
