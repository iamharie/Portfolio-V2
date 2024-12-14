import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TypewriterMotion = ({ text, speed = 0.1 }) => {
  const textVariants = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      opacity: 1,
      transition: {
        delay: i * speed,
      },
    }),
  };

  return (
    <motion.div className="typewriter">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default TypewriterMotion;
