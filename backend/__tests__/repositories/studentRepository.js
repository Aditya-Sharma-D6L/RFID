// __tests__/repositories/studentRepository.test.js

const pool = require("../../src/config/db.config");
const studentRepository = require("../../src/repositories/studentRepository");

describe("Student Repository", () => {
  beforeAll(async () => {
    // Set up test data or clear test database
    await pool.query("DELETE FROM students");
  });

  afterAll(async () => {
    await pool.end(); // Close the database connection
  });

  test("should create a new student", async () => {
    const student = await studentRepository.createStudent(
      1,
      "John Doe",
      "rfid12345"
    );
    expect(student).toHaveProperty("id");
    expect(student.name).toBe("John Doe");
    expect(student.rfid).toBe("rfid12345");
  });

  test("should find a student by RFID", async () => {
    const student = await studentRepository.getStudentByRFID("rfid12345");
    expect(student).not.toBeNull();
    expect(student.name).toBe("John Doe");
  });
});
