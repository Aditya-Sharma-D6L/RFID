// src/components/Footer.tsx
import React from "react";

const Footer: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4">
      {children}
      <p>© 2024 RFID Student System. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
