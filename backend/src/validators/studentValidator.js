// src/validators/studentValidator.js
const Joi = require("joi");

// Custom date format validator for DD-MM-YYYY
const dateFormat = (value, helpers) => {
  const regex = /^\d{2}-\d{2}-\d{4}$/; // Regular expression for DD-MM-YYYY
  if (!regex.test(value)) {
    return helpers.error("any.invalid");
  }
  return value; // Return the valid value
};

const addStudentSchema = Joi.object({
  first_name: Joi.string().max(50).required(), // Mandatory field
  middle_name: Joi.string().max(50).optional().allow(""), // Optional field
  last_name: Joi.string().max(50).optional().allow(""), // Optional field
  dob: Joi.string().custom(dateFormat, "Date format validation").required(), // DD-MM-YYYY format
  gender: Joi.string().valid("M", "F").required(), // Gender must be a string with specific values
  nationality: Joi.string().max(50).required(), // Nationality must be a string
});

module.exports = {
  addStudentSchema,
};
