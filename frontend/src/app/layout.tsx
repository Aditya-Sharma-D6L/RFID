// src/app/layout.tsx
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles/globals.css"; // Keep this to import Tailwind's base styles

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow p-4">
          {" "}
          {/* Padding for main content */}
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
};

export default Layout;
