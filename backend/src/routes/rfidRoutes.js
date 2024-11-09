// src/routes/rfidRoutes.js
// Routes for RFID-related API endpoints.

const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

// Route to fetch all RFID codes
router.get("/show-rfid-codes", studentController.displayAllRfid);

module.exports = router;
