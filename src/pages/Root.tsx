import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/scroll/ScrollToTop";

export default function Root() {
  return (
    <div className="min-h-screen bg-primary-light dark:bg-primary flex flex-col">
      <Navbar />
      <ScrollToTop />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
