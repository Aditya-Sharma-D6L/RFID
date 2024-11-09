// src/routes/studentInfoRoutes.js
// Routes for student information-related API endpoints.

const express = require("express");
const router = express.Router();
const studentInfoController = require("../controllers/studentInfoController");

router.post("/", studentInfoController.addStudentInfo);
router.get("/:studentId", studentInfoController.getStudentInfo);

module.exports = router;
