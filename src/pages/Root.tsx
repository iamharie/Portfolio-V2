import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/scroll/ScrollToTop";
import GlossyBackground from "../components/GlossyBackground";

export default function Root() {
  return (
    <div className="min-h-screen flex flex-col bg-primary-light dark:bg-primary">
      <GlossyBackground />
      <div className="relative flex flex-col flex-1 min-h-screen" style={{ zIndex: 1 }}>
        <Navbar />
        <ScrollToTop />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
