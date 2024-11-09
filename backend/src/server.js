// src/server.js
// This file starts the server and listens on the specified port.

const app = require("./app");
const PORT = process.env.PORT || 8000;

// Start the server
app.listen(PORT, () => {
  console.log(`Backend Server is running on http://localhost:${PORT}`);
});
