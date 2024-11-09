// src/middleware/cache.js
// Middleware to cache responses using node-cache.

const cache = require("../config/nodeCache");

const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl;

  // Check if data for this key is in the cache
  const cachedData = cache.get(key);
  if (cachedData) {
    return res.status(200).json(cachedData); // Return the cached data
  } else {
    // Store the original res.json function to use later
    res.sendResponse = res.json;
    res.json = (body) => {
      cache.set(key, body); // Cache the response body for future requests
      res.sendResponse(body);
    };
    next();
  }
};

module.exports = cacheMiddleware;
