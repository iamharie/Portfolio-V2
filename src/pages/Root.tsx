import { useState } from "react";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BsController } from "react-icons/bs";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/scroll/ScrollToTop";
import GlossyBackground from "../components/GlossyBackground";
import CursorGame from "../components/game/CursorGame";

export default function Root() {
  const [gameOpen, setGameOpen] = useState(false);

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

      {/* Floating game launcher */}
      <motion.button
        onClick={() => setGameOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.4 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2
                   bg-accent text-white px-4 py-2.5 rounded-full
                   shadow-lg shadow-accent/30 hover:shadow-accent/50
                   font-semibold text-sm transition-shadow"
        aria-label="Play game"
      >
        <BsController size={18} />
        <span className="hidden sm:inline">Play</span>
      </motion.button>

      {/* Game overlay */}
      <AnimatePresence>
        {gameOpen && (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <CursorGame onClose={() => setGameOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
