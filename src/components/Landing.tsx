// import React from "react";
import { motion } from "framer-motion";
// import Carousel from "./carousel/Carousel";
import { useNavigate } from "react-router-dom";
import { IconCloudDemo } from "./test-versions/IconCloudDemo";
import Typical from "react-typical";

const Landing = () => {
  const navigate = useNavigate();
  function handleNavigate() {
    navigate("/experience");
  }

  return (
    <div className="relative h-screen">
      <IconCloudDemo />
      <div className="absolute inset-0 flex items-center z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-text-white dark:text-text-dark ">
              <Typical steps={["Hi I am Hari", 5000]} wrapper="span" />
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-text-white dark:text-text-dark">
              <Typical steps={["Software Engineer 👨🏼‍💻", 7000]} wrapper="span" />
            </p>
            <motion.button
              onClick={handleNavigate}
              className="bg-accent px-8 py-3 rounded-lg text-gray font-semibold transition-colors hover:bg-opacity-90"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              whileHover={{ scale: 1.1, backgroundColor: "bg-opacity-90" }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
            {/* <button
              onClick={handleNavigate}
              className="bg-accent px-8 py-3 rounded-lg text-gray font-semibold hover:bg-opacity-90 transition-colors"
            >
              Learn More
            </button> */}
          </div>
        </div>
      </div>
      {/* <div className="mt-8 pt-8 border-t border-secondary dark:border-secondary-light text-center"></div> */}
    </div>
  );
};

export default Landing;
