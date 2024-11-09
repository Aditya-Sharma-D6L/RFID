// __tests__/controllers/attendanceController.test.js

const request = require("supertest");
const app = require("../../src/app");
const pool = require("../../src/config/db.config");

describe("Attendance API", () => {
  beforeAll(async () => {
    await pool.query("DELETE FROM students");
    await pool.query("DELETE FROM attendance");
    await pool.query(
      `INSERT INTO students (id, name, rfid) VALUES (1, 'John Doe', 'rfid12345')`
    );
  });

  afterAll(async () => {
    await pool.end(); // Close the database connection
  });

  test("POST /api/attendance/mark - should mark attendance", async () => {
    const response = await request(app)
      .post("/api/attendance/mark")
      .send({ rfid: "rfid12345" });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.student_id).toBe(1);
  });

  test("GET /api/attendance - should retrieve attendance by date", async () => {
    const today = new Date().toISOString().slice(0, 10); // Format date as YYYY-MM-DD
    const response = await request(app).get(`/api/attendance?date=${today}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
