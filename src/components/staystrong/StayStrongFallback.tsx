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
            Nutrition Module - Coming Soon
          </h2>
          <p className="text-lg text-text-light dark:text-text-dark mb-6 leading-relaxed">
            StayStrong Nutrition is currently in{" "}
            <span className="font-bold text-accent">beta testing</span> with a
            limited group of users.
          </p>
          <p className="text-md text-gray-600 dark:text-gray-400">
            This module helps you generate a personalized nutrition plan
            instantly, based on your inputs such as goals, body metrics, food
            preferences, and meal structure.
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-2 border-accent">
          <h3 className="text-xl font-bold text-accent mb-3">
            Features Preview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🥗</span>
              <div>
                <h4 className="font-semibold text-text-light dark:text-text-dark">
                  Personalized Nutrition Plans
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Get a complete, goal-aligned nutrition plan generated directly
                  within StayStrong, tailored to your lifestyle, training level,
                  and dietary preferences.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">📊</span>
              <div>
                <h4 className="font-semibold text-text-light dark:text-text-dark">
                  Smart, Structured Inputs
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Answer a few guided questions designed around real-world
                  eating habits to receive a practical and sustainable nutrition
                  plan.
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
