// src/app/page.tsx (or Home.tsx if you have separate routing)
import React from "react";
import Link from "next/link";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-6">RFID Student System</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link href="/add-student">
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-blue-600 transition-all">
            <h2 className="text-xl font-semibold">Add a Student</h2>
            <p className="mt-2">Click to add a new student to the system.</p>
          </div>
        </Link>
        <Link href="/view-rfid-codes">
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-green-600 transition-all">
            <h2 className="text-xl font-semibold">View RFID Codes</h2>
            <p className="mt-2">Click to view all assigned RFID codes.</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
