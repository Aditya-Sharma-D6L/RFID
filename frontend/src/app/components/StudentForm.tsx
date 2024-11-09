// src/app/components/StudentForm.tsx
import { useState } from "react";

const StudentForm = () => {
  const [first_name, setFirstName] = useState("");
  const [middle_name, setMiddleName] = useState("");
  const [last_name, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name,
        middle_name,
        last_name,
        dob,
        gender,
        nationality,
      }),
    });

    if (!response.ok) {
      console.error("Failed to add student");
      return;
    }

    const data = await response.json();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="First Name"
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Middle Name"
        onChange={(e) => setMiddleName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="text"
        placeholder="DOB (DD-MM-YYYY)"
        onChange={(e) => setDob(e.target.value)}
        required
      />
      <select onChange={(e) => setGender(e.target.value)} required>
        <option value="">Select Gender</option>
        <option value="M">Male</option>
        <option value="F">Female</option>
      </select>
      <input
        type="text"
        placeholder="Nationality"
        onChange={(e) => setNationality(e.target.value)}
        required
      />
      <button type="submit">Add Student</button>
    </form>
  );
};

export default StudentForm;
