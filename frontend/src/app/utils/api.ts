// src/app/utils/api.ts

// Define an interface for the student data
interface StudentData {
  first_name: string;
  middle_name?: string; // Optional
  last_name?: string; // Optional
  dob: string; // Format: DD-MM-YYYY
  gender: string; // M or F
  nationality: string;
}

// Function to add a new student
export const addStudent = async (studentData: StudentData) => {
  const response = await fetch("/api/students/create-student", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(studentData),
  });

  // Check if the response is okay
  if (!response.ok) {
    throw new Error("Failed to add student");
  }

  return await response.json();
};
