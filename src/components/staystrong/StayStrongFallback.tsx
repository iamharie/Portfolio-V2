import { motion } from "framer-motion";
import { FaDumbbell, FaLock, FaHeart } from "react-icons/fa";

const StayStrongFallback = () => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r from-orange-500 to-red-600 shadow-2xl">
            <FaDumbbell className="text-6xl text-white" />
          </div>
        </motion.div>

        <h1 className="text-5xl font-bold text-accent mb-6">
          StayStrong <FaHeart className="inline text-red-500" />
        </h1>

        <div className="bg-secondary-light dark:bg-secondary rounded-2xl p-8 shadow-xl mb-8">
          <FaLock className="text-5xl text-accent mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-text-light dark:text-text-dark mb-4">
            Coming Soon
          </h2>
          <p className="text-lg text-text-light dark:text-text-dark mb-6 leading-relaxed">
            StayStrong is currently in{" "}
            <span className="font-bold text-accent">beta testing</span> with a
            select group of users.
          </p>
          <p className="text-md text-gray-600 dark:text-gray-400">
            This fitness companion tool helps you build strength the right way
            with a free training block for beginners and intermediate lifters,
            plus nutrition guidance generated from a smart, curated prompt based
            on your inputs.
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-2 border-accent">
          <h3 className="text-xl font-bold text-accent mb-3">
            Features Preview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💪</span>
              <div>
                <h4 className="font-semibold text-text-light dark:text-text-dark">
                  Free Training Block
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  A structured beginner-to-intermediate training program that
                  links to the Strong app, where you can follow a training
                  template personally designed by me.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🥗</span>
              <div>
                <h4 className="font-semibold text-text-light dark:text-text-dark">
                  Nutrition Plan Generator
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Create a custom nutrition prompt from your inputs and use it
                  in your favorite AI tool to generate your nutrition plan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StayStrongFallback;
