// src/controllers/studentController.js
const moment = require("moment"); // Ensure you have moment.js installed
const studentRepository = require("../repositories/studentRepository");
const generateRFID = require("../utils/generateRFID");
const { successResponse } = require("../utils/responseHelper");
const { addStudentSchema } = require("../validators/studentValidator");

const addStudent = async (req, res, next) => {
  try {
    // Validate input
    const { error, value } = addStudentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "error",
        message: error.details[0].message,
        metadata: {
          timestamp: new Date().toISOString(),
          path: req.originalUrl,
        },
      });
    }

    const { first_name, middle_name, last_name, dob, gender, nationality } =
      value;

    // Convert date format from DD-MM-YYYY to YYYY-MM-DD
    const formattedDob = moment(dob, "DD-MM-YYYY").format("YYYY-MM-DD");

    // Create a name by concatenating available fields
    const name = [first_name, middle_name, last_name].filter(Boolean).join(" ");

    // Proceed with the creation of student info and RFID
    const newStudentInfo = await studentRepository.createStudentInfo({
      first_name,
      middle_name,
      last_name,
      dob: formattedDob, // Use formatted date
      gender,
      nationality,
    });

    // Set student_id in student_info to match info_id
    await studentRepository.updateStudentInfoId(newStudentInfo.info_id);

    // Retrieve the updated studentInfo
    const updatedStudentInfo = await studentRepository.getStudentInfoById(
      newStudentInfo.info_id
    );

    // Generate a unique RFID
    let rfid;
    try {
      rfid = await generateRFID();
    } catch (error) {
      console.error("RFID Generation Error:", error);
      return res.status(500).json({
        status: "error",
        message: "Error creating RFID, please try again later.",
        metadata: {
          timestamp: new Date().toISOString(),
          path: req.originalUrl,
        },
      });
    }

    // Create an entry in student_rfid table
    const studentRFID = await studentRepository.createStudentRFID(
      updatedStudentInfo.student_id,
      name,
      rfid
    );

    successResponse(
      res,
      { studentInfo: updatedStudentInfo, studentRFID },
      "Student added successfully",
      201
    );
  } catch (error) {
    console.error("Error Adding Student:", error);
    next(error);
  }
};

/**
 * Retrieves and displays all RFID records from the student_rfid table.
 */
const displayAllRfid = async (req, res, next) => {
  try {
    // Fetch all RFID records from the repository
    const rfidRecords = await studentRepository.getAllRfid();

    // Return the records in a success response
    successResponse(
      res,
      rfidRecords.rows,
      "RFID codes fetched successfully",
      200
    );
  } catch (error) {
    console.error("Error Fetching RFID Records:", error);
    next(error);
  }
};

module.exports = {
  addStudent,
  displayAllRfid,
};
