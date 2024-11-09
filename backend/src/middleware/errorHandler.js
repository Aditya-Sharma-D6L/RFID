// src/middleware/errorHandler.js
// Centralized error handler for secure and concise error responses.

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: "error",
    message: err.message || "An unexpected error occurred",
    metadata: {
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
    },
  });
};

module.exports = errorHandler;
