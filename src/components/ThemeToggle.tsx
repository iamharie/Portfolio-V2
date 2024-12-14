import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-secondary-light dark:hover:bg-secondary transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <FaSun className="text-text-dark" />
      ) : (
        <FaMoon className="text-text-light" />
      )}
    </motion.button>
  );
};

export default ThemeToggle;
