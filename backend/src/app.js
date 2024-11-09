// src/app.js
// This file sets up the main Express application, including route configurations and middleware.

const express = require("express");
const app = express();
const studentRoutes = require("./routes/studentRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const rfidRoutes = require("./routes/rfidRoutes"); // Import the RFID routes
const errorHandler = require("./middleware/errorHandler");
const securityHeaders = require("./middleware/securityHeaders");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000", // Replace with frontend origin
  })
);

app.use(express.json()); // Parse incoming JSON requests
app.use(securityHeaders); // Apply security headers globally

// Define routes
app.use("/api/students", studentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/rfid", rfidRoutes);

// Global error handler middleware (placed after all routes)
app.use(errorHandler);

module.exports = app;
