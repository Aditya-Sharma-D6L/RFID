// src/middleware/securityHeaders.js
// Middleware for adding security headers to each response.

const securityHeaders = (req, res, next) => {
  // Prevent MIME-type sniffing
  res.setHeader("X-Content-Type-Options", "nosniff");

  // Prevent pages from being embedded in iframes (Clickjacking protection)
  res.setHeader("X-Frame-Options", "DENY");

  // Enable cross-site scripting filtering in browsers
  res.setHeader("X-XSS-Protection", "1; mode=block");

  // Allow CORS for secure cross-origin requests
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
};

module.exports = securityHeaders;
