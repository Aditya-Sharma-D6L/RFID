// src/utils/responseHelper.js
// Utility function for consistent, JSON:API-compliant success responses with metadata and optional pagination.

const successResponse = (
  res,
  data,
  message = "Success",
  statusCode = 200,
  pagination = null
) => {
  const response = {
    jsonapi: {
      version: "1.0",
    },
    status: "success",
    message,
    data,
    meta: {
      timestamp: new Date().toISOString(),
      path: res.req.originalUrl,
    },
  };

  // Add pagination metadata if applicable
  if (pagination) {
    response.meta.pagination = {
      totalItems: pagination.totalItems,
      currentPage: pagination.currentPage,
      pageSize: pagination.pageSize,
      totalPages: pagination.totalPages,
    };
  }

  res.status(statusCode).json(response);
};

module.exports = {
  successResponse,
};
