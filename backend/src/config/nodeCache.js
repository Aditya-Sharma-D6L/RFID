// src/config/nodeCache.js
// Initialize and export a Node Cache instance for caching data in memory.

const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 3600 }); // Default TTL (Time-To-Live) set to 1 hour

module.exports = cache;
