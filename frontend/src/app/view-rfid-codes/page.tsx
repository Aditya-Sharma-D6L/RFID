// src/app/view-rfid-codes/page.tsx
"use client"; // This marks the component as a client component

import React, { useEffect, useState } from "react";

type RFIDRecord = {
  id: number;
  name: string;
  rfid: string;
};

const ViewRFIDCodes: React.FC = () => {
  const [rfidData, setRFIDData] = useState<RFIDRecord[]>([]);

  useEffect(() => {
    const fetchRFIDData = async () => {
      try {
        const response = await fetch("/api/rfid/show-rfid-codes");
        if (response.ok) {
          const data = await response.json();
          setRFIDData(data);
        } else {
          console.error("Failed to fetch RFID codes");
        }
      } catch (error) {
        console.error("Error fetching RFID codes:", error);
      }
    };

    fetchRFIDData();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-background text-foreground p-6">
      <h1 className="text-3xl font-bold mb-6">RFID Codes</h1>
      <div className="w-full max-w-3xl">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200">ID</th>
              <th className="py-2 px-4 border-b border-gray-200">Name</th>
              <th className="py-2 px-4 border-b border-gray-200">RFID Code</th>
            </tr>
          </thead>
          <tbody>
            {rfidData.map((record: any) => (
              <tr key={record.id}>
                <td className="py-2 px-4 border-b border-gray-200 text-center">
                  {record.id}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {record.name}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {record.rfid}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewRFIDCodes;
