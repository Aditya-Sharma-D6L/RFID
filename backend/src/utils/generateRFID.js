// src/utils/generateRFID.js
const generateRFID = () => {
  // Generate a simple random RFID; in practice, you'd want a more robust method
  const randomID = Math.random().toString(36).substring(2, 10);
  return `rfid${randomID}`; // Prefix for clarity
};

module.exports = generateRFID;
