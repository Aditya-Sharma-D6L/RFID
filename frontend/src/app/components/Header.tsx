// src/app/components/Header.tsx
import Link from "next/link";

const Header = () => {
  return (
    <>
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-xl">RFID Student System</h1>
      </header>
      <nav>
        <Link href="/">Home</Link> | <Link href="/students">Students</Link> |{" "}
        <Link href="/attendance">Attendance</Link>
      </nav>
    </>
  );
};

export default Header;
