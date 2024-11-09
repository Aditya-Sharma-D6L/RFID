// src/models/studentModel.js
// Defines the structure of the Student entity for reference.

module.exports = {
  id: "INTEGER PRIMARY KEY", // Unique identifier for each student
  name: "VARCHAR(100) NOT NULL", // Student's name
  rfid: "VARCHAR(50) UNIQUE NOT NULL", // RFID tag identifier for each student
};
