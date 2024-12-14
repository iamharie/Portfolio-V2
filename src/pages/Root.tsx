import { Outlet } from "react-router-dom";
import Home from "./Home";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Root() {
  return (
    // <div className="min-h-screen bg-primary flex flex-col">
    <div className="min-h-screen bg-primary-light dark:bg-primary flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
