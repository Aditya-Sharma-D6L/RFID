"use client";

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
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/rfid/show-rfid-codes`
        );
        if (response.ok) {
          const jsonResponse = await response.json();
          setRFIDData(jsonResponse.data);
        } else {
          console.error("Failed to fetch RFID codes");
        }
      } catch (error) {
        console.error("Error fetching RFID codes:", error);
      }
    };

    fetchRFIDData();
  }, []);

  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const toggleText = (id: number) => {
    setExpandedRows((prev) => {
      const updated = new Set(prev);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }
      return updated;
    });
  };

  const renderTextWithEllipsis = (text: string, id: number) => {
    const limit = 15; // Character limit for ellipsis
    const isExpanded = expandedRows.has(id);
    const displayText = isExpanded
      ? text
      : text.length > limit
      ? text.slice(0, limit) + "..."
      : text;

    return (
      <span
        onClick={() => toggleText(id)}
        className="cursor-pointer hover:underline"
        title={text}
      >
        {displayText}
      </span>
    );
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 text-gray-800 p-6">
      <h1 className="text-3xl font-bold mb-6">RFID Codes</h1>
      <div className="w-full max-w-3xl">
        <table className="min-w-full bg-white rounded-lg shadow-md text-center">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200">ID</th>
              <th className="py-2 px-4 border-b border-gray-200">Name</th>
              <th className="py-2 px-4 border-b border-gray-200">RFID Code</th>
            </tr>
          </thead>
          <tbody>
            {rfidData.map((record: RFIDRecord) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b border-gray-200">
                  {record.id}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {renderTextWithEllipsis(record.name, record.id)}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {renderTextWithEllipsis(record.rfid, record.id)}
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
